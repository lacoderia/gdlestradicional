/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

var map = null;
var mapCenter = null;
var showAllRoutesZoom = false;
var paintingRoutes = false;

var routes = [
    {
        'name': 'Ruta 1',
        'description': 'Descripción de la ruta 1',
            'points': [
                { 'lat':20.666, 'lng': -103.350 },
                { 'lat':20.668, 'lng': -103.349 },
                { 'lat':20.667, 'lng': -103.353 },
                { 'lat':20.666, 'lng': -103.354 }
            ]
    },
    {
        'name': 'Ruta 2',
        'description': 'Descripción de la ruta 2',
        'points': [
            { 'lat':20.665, 'lng': -103.349 },
            { 'lat':20.667, 'lng': -103.348 },
            { 'lat':20.666, 'lng': -103.352 },
            { 'lat':20.665, 'lng': -103.353 }
        ]
    }
];

function init() {

    $('#news-feed').draggable();

    mapCenter = new google.maps.LatLng(20.666735, -103.350335);

    var styles = [
        {
            stylers: [
                { hue: "#00ffe6" },
                { saturation: -20 }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "on" }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                { "visibility": "simplified" }
            ]
        }
    ];

    var mapOptions = {
        zoom: 16,
        center: mapCenter,
        minZoom: 16,
        maxZoom: 19,
        disableDefaultUI: true,
        draggable: false,
        styles: styles
    }


    try {
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        google.maps.event.addListener(map, 'idle', function() {
            if (showAllRoutesZoom) {
                map.panTo(mapCenter);
                showAllRoutesZoom = false;
            }
        });

        var rectangle = new google.maps.Rectangle({
            strokeColor: '#11384C',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#13435B',
            fillOpacity: 0.6,
            map: map,
            bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(20.751853, -103.483541),
                new google.maps.LatLng(20.507659, -103.146741)
            )
        });

        for (var i=0; i < routes.length; i++) {

            routes[i].markers = new Array();
            routes[i].lines = new Array();

            var lineSymbol = {
                path: 'M 0,-0.7 0,0.7',
                strokeOpacity: 1,
                scale: 3
            };

            for(var j = 0; j < routes[i].points.length; j++){

                if (j == 0) {
                    var icon = {
                        url: '/assets/marker_azul_cuadrito.png',
                        scaledSize: new google.maps.Size(40, 70)
                    };
                } else {
                    var icon = {
                        url: '/assets/cuadrito.png',
                        scaledSize: new google.maps.Size(16, 16),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(8, 8)
                    };
                }

                var routeCoordinate = new google.maps.LatLng(routes[i].points[j].lat, routes[i].points[j].lng);

                var marker = new google.maps.Marker({
                    position: routeCoordinate,
                    optimized: false,
                    icon: icon,
                    map: null,
                    routeIndex: i
                });

                google.maps.event.addListener(marker, 'click', function() {
                    showRouteDetail(this.routeIndex);
                });

                routes[i].markers.push(marker);

                if (j+1 < routes[i].points.length) {
                    var lineArray = [
                        new google.maps.LatLng(routes[i].points[j].lat, routes[i].points[j].lng),
                        new google.maps.LatLng(routes[i].points[j+1].lat, routes[i].points[j+1].lng)
                    ];

                    var line = new google.maps.Polyline({
                        path: lineArray,
                        strokeOpacity: 0,
                        icons: [{
                            icon: lineSymbol,
                            offset: '0',
                            repeat: '9px'
                        }],
                        map: null
                    });

                    routes[i].lines.push(line);
                }

            }

        }

        paintAllRoutes(0);


    } catch(e) {
        console.log(e);
    }
}

function paintAllRoutes(){
    paintingRoutes = true;

    for (var i=0; i<routes.length; i++) {
        paintOneRoute(i);
    }

    //showAllRoutesZoom = true;
    //map.setZoom(16);
}

function paintOneRoute(routeIndex) {
    if(routeIndex < routes.length){
        paintOneMarker(routeIndex, 0);
        setTimeout(function() {
            paintOneLine(routeIndex, 0);
        }, 500);
    }
}

function paintOneMarker(routeIndex, markerIndex) {
    if(markerIndex < routes[routeIndex].points.length){
        routes[routeIndex].markers[markerIndex].setMap(map);
        setTimeout(function(){
            paintOneMarker(routeIndex, markerIndex+1);
        }, 1000)
    } else {
        paintingRoutes = false;
    }
}

function paintOneLine(routeIndex, lineIndex) {
    if(lineIndex < routes[routeIndex].lines.length){
        routes[routeIndex].lines[lineIndex].setMap(map);
        setTimeout(function(){
            paintOneLine(routeIndex, lineIndex+1);
        }, 1000)
    }
}

function showAllRoutes() {
    for (var i=0; i<routes.length; i++) {

        for (var j=0; j<routes[i].lines.length; j++) {
            routes[i].lines[j].setMap(map);
        }

        for (var j=0; j<routes[i].markers.length; j++) {
            routes[i].markers[j].setMap(map);
        }
    }

    showAllRoutesZoom = true;
    map.setZoom(16);
}

function showRouteDetail(routeIndex){
    if (!paintingRoutes){
        var markers = routes[routeIndex].markers;
        var bounds = new google.maps.LatLngBounds();
        for(i=0;i<markers.length;i++) {
            bounds.extend(markers[i].getPosition());
        }

        map.fitBounds(bounds);

        for (var i=0; i<routes.length; i++) {
            if (i != routeIndex) {

                for (var j=0; j<routes[i].lines.length; j++) {
                    routes[i].lines[j].setMap(null);
                }

                for (var j=0; j<routes[i].markers.length; j++) {
                    routes[i].markers[j].setMap(null);
                }
            }
        }
    }
}
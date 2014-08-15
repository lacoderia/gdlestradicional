/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

var map = null;
var mapCenter = null;
var firstLoad = true;
var showAllRoutesZoom = false;
var paintingRoutes = false;
var routes = [];
var galleryPictures = [];

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
        zoom: 13,
        center: mapCenter,
        minZoom: 13,
        maxZoom: 19,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
        styles: styles
    }


    try {
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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

        google.maps.event.addListener(map, 'idle', function() {
            if (showAllRoutesZoom) {
                map.panTo(mapCenter);
                showAllRoutesZoom = false;
            }
        });

        google.maps.event.addListener(map, 'tilesloaded', function() {
            if (firstLoad) {

                setTimeout(function(){
                    $.ajax({
                        type: "GET",
                        url: "/routes/all.json",
                        data: null,
                        dataType: "json",
                        success: function(response) {
                            routes = response;
                            for (var i=0; i < routes.length; i++) {

                                routes[i].markers = new Array();
                                routes[i].lines = new Array();

                                var lineSymbol = {
                                    path: 'M 0,-0.7 0,0.7',
                                    strokeOpacity: 1,
                                    scale: 3
                                };

                                for(var j = 0; j < routes[i].locations.length; j++){

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

                                    var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);

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

                                    if (j+1 < routes[i].locations.length) {
                                        var lineArray = [
                                            new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long),
                                            new google.maps.LatLng(routes[i].locations[j+1].lat, routes[i].locations[j+1].long)
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
                        },
                        error: function(error) {
                        }
                    });
                }, 1000);

                firstLoad = false;
            }
        });

    } catch(e) {
        console.log(e);
    }
}

function paintAllRoutes(){
    paintingRoutes = true;

    for (var i=0; i<routes.length; i++) {
        paintOneRoute(i);
    }
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
    if(markerIndex < routes[routeIndex].locations.length){
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

            var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);

            var marker = new google.maps.Marker({
                position: routeCoordinate,
                optimized: false,
                icon: icon,
                map: null,
                routeIndex: i
            });

            marker.setMap(map);

            google.maps.event.addListener(marker, 'click', function() {
                showRouteDetail(this.routeIndex);
            });

            routes[i].markers[j].setMap(null);
            routes[i].markers[j] = marker;
        }
    }

    showAllRoutesZoom = true;
    map.setZoom(13);
}

function showRouteDetail(routeIndex){
    if (!paintingRoutes){
        var markers = routes[routeIndex].markers;
        var bounds = new google.maps.LatLngBounds();
        for(i=0;i<markers.length;i++) {
            bounds.extend(markers[i].getPosition());
        }

        map.fitBounds(bounds);

        /*map.setCenter(bounds.getCenter());
        map.setZoom(getZoomByBounds(map, bounds));*/

        for (var i=0; i<routes.length; i++) {
            if (i == routeIndex) {
                for (var j=0; j<routes[i].markers.length; j++) {
                    routes[i].markers[j].setMap(null);

                    var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);

                    var marker = new RichMarker({
                        position: routeCoordinate,
                        map: map,
                        flat: true,
                        anchor: RichMarkerPosition.MIDDLE,
                        draggable: false,
                        id: routes[i].locations[j].id,
                        content: '<div class="image-marker my-marker">' +
                                    '<img src="' + routes[i].locations[j].recent_photo + '"/>' +
                                 '</div>'
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        $.ajax({
                            type: "GET",
                            url: "/locations/" + this.id + "/gallery.json",
                            data: null,
                            dataType: "json",
                            success: function(response) {
                                galleryPictures = response;

                                $('#picture-gallery img').attr('src', galleryPictures[0].url_normal);
                                showPictureGallery(this);
                            },
                            error: function(error) {
                            }
                        });
                    });

                    routes[i].markers[j] = marker;
                }
            }
        }

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

function showPictureGallery(marker) {
    $('#overlay').show();

    /*var pano;
    var latlng = new google.maps.LatLng(20.666735, -103.350335);

    var panoOptions = {
        position: latlng,
        pov: {
            heading: 0,
            pitch: 0
        }
    };

    pano = new google.maps.StreetViewPanorama(
        document.getElementById('panorama'),
        panoOptions);

    window.setInterval(function() {
        var pov = pano.getPov();
        pov.heading += 0.2;
        pano.setPov(pov);
    }, 10);*/

    $('#picture-gallery-container').show();
}

function hidePictureGallery() {
    $('#overlay').hide();
    $('#picture-gallery-container').hide();
}

function showPreviousPicture() {
    hidePictureGallery();
}

function showNextPicture() {
    $('#picture-gallery img').attr('src', galleryPictures[1].url_normal);
}

function getZoomByBounds( map, bounds ){
    var MAX_ZOOM = map.mapTypes.get( map.getMapTypeId() ).maxZoom || 21 ;
    var MIN_ZOOM = map.mapTypes.get( map.getMapTypeId() ).minZoom || 0 ;

    var ne= map.getProjection().fromLatLngToPoint( bounds.getNorthEast() );
    var sw= map.getProjection().fromLatLngToPoint( bounds.getSouthWest() );

    var worldCoordWidth = Math.abs(ne.x-sw.x);
    var worldCoordHeight = Math.abs(ne.y-sw.y);

    //Fit padding in pixels
    var FIT_PAD = 40;

    for( var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom ){
        if( worldCoordWidth*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).width() &&
            worldCoordHeight*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).height() )
            return zoom;
    }
    return 0;
}
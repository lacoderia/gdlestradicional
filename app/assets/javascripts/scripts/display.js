/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

var map = null;
var pano, panoInterval = null;
var mapCenter = null;
var firstLoad = true;
var showAllRoutesZoom = false;
var paintingRoutes = false;
var routes = [];
var tempRoute = [];
var galleryPictures = null;
var dispatcher, channel = null;

function init() {

    if (screen.width <= 768) {
        window.location = "/mobile";
    }

    $('#news-feed').draggable();
    $('#influencer-picture').draggable({
        stop: function(event, ui) {
            $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
        }
    });

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
            fillOpacity: 0.7,
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

                dispatcher = new WebSocketRails('localhost:3000/websocket');
                channel = dispatcher.subscribe('twitter_channel');

                channel.bind('new_tweet', function(data) {
                    console.log('channel event received: ' + data);

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data[0], data[1]),
                        optimized: false,
                        icon: '/assets/beam.gif',
                        map: map
                    });

                    setTimeout(function(){
                        marker.setMap(null);
                        marker = null;
                    }, 2000);

                });

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
                                    var animationType = undefined;
                                    var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);

                                    if (j == 0) {
                                        var markerId = 'first_marker_' + i + '_' + j;
                                        var marker = new RichMarker({
                                            position: routeCoordinate,
                                            map: map,
                                            flat: true,
                                            anchor: new google.maps.Size(-20, -70),
                                            draggable: false,
                                            routeIndex: i,
                                            jqueryId: markerId,
                                            content: '<div id="' + markerId + '" class="first-marker">' +
                                                    '<img src="/assets/marker_azul_cuadrito.png"/>' +
                                                    '<div class="route-name">' + routes[i].name + '</div>' +
                                                '</div>'
                                        });

                                        google.maps.event.addListener(marker, 'ready', function() {
                                            $('#' + this.jqueryId).hide();
                                            $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );
                                        });

                                    } else {
                                        var icon = {
                                            url: '/assets/cuadrito.png',
                                            scaledSize: new google.maps.Size(16, 16),
                                            origin: new google.maps.Point(0, 0),
                                            anchor: new google.maps.Point(8, 8)
                                        };

                                        var marker = new google.maps.Marker({
                                            position: routeCoordinate,
                                            optimized: false,
                                            icon: icon,
                                            map: null,
                                            animation: animationType,
                                            routeIndex: i
                                        });
                                    }

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

                /*$('#social-stream').dcSocialStream({
                    days: 1000,
                    limit: 50,
                    feeds: {
                        twitter: {
                            id: '#gdlestradicional',
                            url: 'http://www.ariza.com.mx/twitter.php',
                            search: ''
                        },
                        instagram: {
                            id: '#gdlestradicional',
                            accessToken: '238235014.75e23c3.316bdfe8b6ff4dbbade96a95c7f8d660',
                            redirectUrl: 'http://localhost',
                            clientId: '75e23c3095da475cb0c68fa5db4c676f',
                            comments: 0,
                            likes: 0,
                            search: '',
                            out: 'intro,thumb,text,user,meta'
                        }
                    },
                    height: 400,
                    rotate: {
                        direction: 'up',
                        delay: 8000
                    },
                    iconPath: '/assets/feed/dcsns-light/',
                    imagePath: '/assets/feed/dcsns-light/'
                });*/

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

    $('#influencer-picture').hide();

    for (var i=0; i<tempRoute.length; i++) {
        tempRoute[i].setMap(null);
    }
    tempRoute = [];

    for (var i=0; i<routes.length; i++) {
        for (var j=0; j<routes[i].lines.length; j++) {
            routes[i].lines[j].setMap(map);
        }

        for (var j=0; j<routes[i].markers.length; j++) {
            routes[i].markers[j].setMap(null);

            var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);
            if (j == 0) {
                var markerId = 'first_marker_' + i + '_' + j;
                var marker = new RichMarker({
                    position: routeCoordinate,
                    map: map,
                    flat: true,
                    anchor: new google.maps.Size(-20, -70),
                    draggable: false,
                    routeIndex: i,
                    jqueryId: markerId,
                    content: '<div id="' + markerId + '" class="first-marker">' +
                        '<img src="/assets/marker_azul_cuadrito.png"/>' +
                        '<div class="route-name">' + routes[i].name + '</div>' +
                        '</div>'
                });

                google.maps.event.addListener(marker, 'ready', function() {
                    $('#' + this.jqueryId).hide();
                    $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );
                });
            } else {
                var icon = {
                    url: '/assets/cuadrito.png',
                    scaledSize: new google.maps.Size(16, 16),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(8, 8)
                };

                var marker = new google.maps.Marker({
                    position: routeCoordinate,
                    optimized: false,
                    icon: icon,
                    map: map,
                    routeIndex: i
                });
            }

            google.maps.event.addListener(marker, 'click', function() {
                showRouteDetail(this.routeIndex);
            });

            routes[i].markers[j] = marker;
        }
    }

    showAllRoutesZoom = true;
    map.setZoom(13);
}

function showRouteDetail(routeIndex){
    if (!paintingRoutes){

        $('#influencer-picture img').attr('src', routes[routeIndex].locations[0].recent_photo);
        $('#influencer-picture').fadeIn(1000);

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

                    var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);
                    var markerId = 'marker_' + i + '_' + j;
                    var marker = new RichMarker({
                        index: j,
                        position: routeCoordinate,
                        map: map,
                        flat: true,
                        anchor: RichMarkerPosition.TOP,
                        draggable: false,
                        id: routes[i].locations[j].id,
                        jqueryId : markerId,
                        content: '<div class="image-marker my-marker" id="' + markerId + '">' +
                                    '<img src="' + routes[i].locations[j].recent_photo + '"/>' +
                                 '</div>'
                    });

                    google.maps.event.addListener(marker, 'ready', function() {
                        var richMarker = this;
                        $('#' + this.jqueryId).hide();
                        var time = (this.index+1) * 1000;
                        $('#' + this.jqueryId).fadeIn(time);
                        $('#' + this.jqueryId).parent().parent().draggable({
                            stop: function(event, ui) {
                                $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
                            }
                        });
                        $('#' + this.jqueryId).click(function(){

                            for (var i=0; i<routes.length; i++) {
                                for (var j=0; j<routes[i].markers.length; j++) {
                                    if (routes[i].locations[j].id == richMarker.id) {
                                        if (routes[i].locations[j].pictures != undefined) {
                                            galleryPictures = routes[i].locations[j].pictures;
                                            updatePictureDetails(galleryPictures[0]);
                                            showPictureGallery(richMarker);
                                            break;
                                        } else {
                                            $.ajax({
                                                type: "GET",
                                                url: "/locations/" + richMarker.id + "/gallery.json",
                                                data: null,
                                                dataType: "json",
                                                success: function(response) {
                                                    for (var i=0; i<routes.length; i++) {
                                                        for (var j = 0; j < routes[i].markers.length; j++) {
                                                            if (routes[i].locations[j].id == richMarker.id) {
                                                                routes[i].locations[j].pictures = sortGalleryPictures(response);
                                                                galleryPictures = routes[i].locations[j].pictures;
                                                                updatePictureDetails(galleryPictures[0]);
                                                                showPictureGallery(richMarker);
                                                            }
                                                        }
                                                    }
                                                },
                                                error: function(error) {
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                            
                        });
                    });

                    tempRoute.push(marker);
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
            } else {
                for (var j=0; j<routes[i].markers.length; j++) {
                    google.maps.event.clearListeners(routes[i].markers[j], 'click');
                }
            }

        }
    }
}

function updatePictureDetails(post) {
    $('#picture-gallery .post-author').html(post.author_nickname);
    $('#picture-gallery p').html(post.caption);
    $('#marker-picture').attr('src', "");
    $('#marker-picture').attr('src', post.url_normal);
    $('#current-picture-id').val(post.id);
}

function showPictureGallery(marker) {
    $('#overlay').show();
    $('#picture-gallery-container').show();

    var panoOptions = {
        position: marker.position,
        pov: {
            heading: 0,
            pitch: 0
        },
        streetViewControl: false,
        enableCloseButton: false,
        linksControl: false,
        panControl: false,
        clickToGo: false,
        scrollwheel: false,
        addressControl: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
        zoomControl: false
    };

    pano = new google.maps.StreetViewPanorama(
        document.getElementById('panorama'),
        panoOptions);

    panoInterval = window.setInterval(function() {
        var pov = pano.getPov();
        pov.heading += 0.1;
        pano.setPov(pov);
    }, 10);

}

function hidePictureGallery() {
    $('#overlay').hide();
    $('#picture-gallery-container').hide();

    pano = null;
    clearInterval(panoInterval);
}

function pictureGalleryClick(e) {
    if (!$(e.target).closest('#picture-gallery').get(0)) {
        hidePictureGallery();
    }
}

function sortGalleryPictures(galleryPictures){
    galleryPictures.sort(function(a, b) {
        return b.id - a.id;
    });

    return galleryPictures;
}

function showPreviousPicture() {
    var previousIndex = 0;
    for (var i=0; i<galleryPictures.length; i++) {
        if (galleryPictures[i].id == $('#current-picture-id').val()) {
            if (i-1 >= 0) {
                previousIndex = i-1;
            } else {
                previousIndex = galleryPictures.length - 1;
            }
            break;
        }
    }

    updatePictureDetails(galleryPictures[previousIndex]);
}

function showNextPicture() {
    var nextIndex = 0;
    for (var i=0; i<galleryPictures.length; i++) {
        if (galleryPictures[i].id == $('#current-picture-id').val()) {
            if (i+1 < galleryPictures.length) {
                nextIndex = i+1;
            } else {
                nextIndex = 0;
            }
            break;
        }
    }

    updatePictureDetails(galleryPictures[nextIndex]);
}

/** Influencer **/

function showInfluencerGallery() {
    $('#overlay').show();
    $('#influencer-container').show();
}

function hideInfluencerGallery() {
    $('#overlay').hide();
    $('#influencer-container').hide();
}

function influencerGalleryClick(e) {
    if (!$(e.target).closest('#influencer-gallery').get(0)) {
        hideInfluencerGallery();
        $("#influencer-video").attr('src','');
    }
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
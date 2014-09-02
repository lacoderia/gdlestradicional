/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

var map = null;
var mapCenter = null;
var showElements = false;
var showAllRoutesZoom = false;
var paintingRoutes = true;
var routes = [];
var tempRoute = [];
var galleryPictures = null;
var dispatcher, channel = null;
var user;
var latestPictures = [];
var latestPicturesPositions = []

function init() {

    mapCenter = new google.maps.LatLng(20.666735, -103.350335);
    var headerHeight = $('header').outerHeight();

    var mapHeight = $(window).height() - headerHeight;
    $('#map_container').height(mapHeight);
    $('#map-canvas').height(mapHeight);
    $('#gallery').height(mapHeight)

    $('.close-gallery').click(function(){
       hidePictureGallery();
    });

    $('#simple-menu').sidr();

    $('#sidr .close-menu').click(function(event){
        $.sidr('close', 'sidr');
    });

    if ($("#ruby-values").data("user")) {
        user = $("#ruby-values").data("user");
        showDashboard();
    }

    $('#influencer-picture').draggable({
        stop: function(event, ui) {
            $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
        }
    });


    if(window.DeviceOrientationEvent){
        window.addEventListener('deviceorientation', devOrientHandler, false);
    }

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
        scrollwheel: false,
        disableDoubleClickZoom: true,
        draggable: false,
        styles: styles
    }

		getLatestPictures();

		latestPicturesPositions.push(new google.maps.LatLng(20.638339,-103.364336)); 
		latestPicturesPositions.push(new google.maps.LatLng(20.634339,-103.338336));
		latestPicturesPositions.push(new google.maps.LatLng(20.689000,-103.368336)); 
		latestPicturesPositions.push(new google.maps.LatLng(20.636339,-103.355336)); 
		latestPicturesPositions.push(new google.maps.LatLng(20.685339,-103.332336));
		latestPicturesPositions.push(new google.maps.LatLng(20.686339,-103.362336));
		latestPicturesPositions.push(new google.maps.LatLng(20.686339,-103.342336));
		latestPicturesPositions.push(new google.maps.LatLng(20.634339,-103.342336));
		latestPicturesPositions.push(new google.maps.LatLng(20.689339,-103.342336));
		latestPicturesPositions.push(new google.maps.LatLng(20.686339,-103.362336));

    try {
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var rectangle = new google.maps.Rectangle({
            strokeColor: '#11384C',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#13435B',
            fillOpacity: 0.6,
            clickable: false,
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

        //google.maps.event.addListener(map, 'tilesloaded', function() {        });

        dispatcher = new WebSocketRails('104.130.128.19:3001/websocket');
        channel = dispatcher.subscribe('twitter_channel');

        channel.bind('new_tweet', function(data) {
            //console.log('channel event received: ' + data);

            var marker = new RichMarker({
                position: new google.maps.LatLng(data[0], data[1]),
                map: map,
                flat: true,
                anchor: new google.maps.Size(-20, -70),
                draggable: false,
                content: '<div>' +
                    '<div class="pin icon-uniE600"></div>' +
                    '<div class="pulse"></div>'+
                    '</div>'
            });

            setTimeout(function(){
                marker.setMap(null);
                marker = null;
            }, 3000);

        });

        channel.bind('new_picture', function(data) {
			//console.log('new picture event received: ' + data);

            data = JSON.parse(data);
			addLatestPicture(data);
            for (var i=0; i<routes.length; i++) {
                for (var j = 0; j < routes[i].locations.length; j++) {
                    if (routes[i].locations[j].id == data.location_id) {
                        routes[i].locations[j].recent_photo = data.url_thumb;

                        if (routes[i].locations[j].pictures) {
                            routes[i].locations[j].pictures.push(data);
                            sortGalleryPictures(routes[i].locations[j].pictures);
                        }

                        var markerId = 'marker_' + i + '_' + j;
                        for (var l=0; l<tempRoute.length; l++) {
                            if (tempRoute[l].id == data.location_id) {
                                $('#' + markerId + ' img').hide();
                                $('#' + markerId + ' img').attr('src', data.url_thumb);
                                $('#' + markerId + ' img').fadeIn(1000);
                            }

                        }
                    }
                }
            }

            var content = '';
            var imgURL = data.url_normal;
            var caption = data.caption;
            var author_nickname = data.author_nickname;
            var post_like = '';

            if (user) {
                if (hasLiked(data.instagram_id)) {
                    post_like = "<span>Ya te gusta esta foto</span>";
                } else {
                    post_like = "<a href='#' onclick='likePhoto(" + data.id + ")'>Me gusta</a>";
                }
            }

            content += "<div id='picture_" + data.id + "'>" +
                "<img src=\"" + imgURL + "\" alt=\"" + caption + "\">" +
                "<span class='post'>" +
                "<div class='post-background'></div>" +
                "<h3>" + author_nickname + "</h3>" +
                "<div class='post-like'>" + post_like + "</div>" +
                "<p>" + caption + "</p>" +
                "</span>" +
                "</div>";

            var slick = $('#slick-carousel').getSlick();
            if (slick){
                $('#slick-carousel').slickAdd(content);
            }

            if (user) {
                $('.post-like').show();

                if (data.author_id == user.uid){
                    user.photos.push(data);
                    showDashboard();
                }
            } else {
                $('.post-like').hide();
            }

        });

    } catch(e) {
        console.log(e);
    }
}

function devOrientHandler(event){

}

function getLatestPictures() {
	$.ajax({
		type: "GET",
		url: "/photos/recent.json",
		data: null,
		dataType: "json",
		success: function(response) {
			latestPictures = response;	
		},
		error: function(error) {
		}
	});	
}

function addLatestPicture(data) {
	var latestPicture = {
		id: data.id,
		author_nickname: data.author_nickname,
		url_low: data.url_low,
		url_thumb: data.url_thumb
	};
	latestPictures.shift();
	latestPictures.push(latestPicture);
}

function createLatestPictureMarker(pic, nickname){

		position = Math.floor((Math.random() * 10) + 1)-1;
		//console.log("position " + position);
		var marker = new RichMarker({
				position: latestPicturesPositions[position],
				map: map,
				draggable: false,
				flat: true,
				jqueryId: "latest-pic-mobile",
				content: '<div id="latest-pic-mobile"><div>#GDLESTRADICIONAL</div><img src="' + pic + '"/><div>'+ nickname +'</div></div>'
		});

		google.maps.event.addListener(marker, 'ready', function() {
  		$('#latest-pic-mobile').fadeIn(1000);    
		});
}

function showLatestPictures() {

	createLatestPictureMarker(latestPictures[0].url_thumb, latestPictures[0].author_nickname);
	setTimeout(function(){
  	$('#latest-pic-mobile').fadeOut(1000, function(){    
			$('#latest-pic-mobile').remove();
		});
	}, 5000);
	
	var start = 1;
	setInterval(function(){
		try {
			pic = latestPictures[start].url_thumb;
			createLatestPictureMarker(pic, latestPictures[start].author_nickname);
		} catch(e) {
			start = 0;
			pic = latestPictures[start].url_thumb;
			createLatestPictureMarker(pic, latestPictures[start].author_nickname);
		}
		setTimeout(function(){
			$('#latest-pic-mobile').fadeOut(1000, function(){    
				$('#latest-pic-mobile').remove();
			});
		}, 5000);
		start++;
	}, 10000);
}


function launchApp() {
    $('#intro').fadeOut(1000, function() {
        showElements = true;
        loadRoutes();
		showLatestPictures();
    });
}

function loadRoutes() {
    $.ajax({
        type: "GET",
        url: "/routes/all.json",
        data: null,
        dataType: "json",
        success: function(response) {
            routes = response;
            for (var i=0; i < routes.length; i++) {

                $('#sidr ul').append('<li><a data-route-index="' + i + '" title="' + routes[i].name + '"><span class="icon-uniE605"></span> ' + routes[i].name + '</a></li>')

                routes[i].markers = new Array();
                routes[i].lines = new Array();

                var lineSymbol = {
                    path: 'M 0,-0.5 0,0.5',
                    strokeOpacity: 1,
                    scale: 2.5
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
                        var markerId = 'secondary_marker_' + i + '_' + j;

												// Si no es el primer punto pintamos un cuadro
												var marker = new RichMarker({
														position: routeCoordinate,
														map: null,
														draggable: false,
														flat: true,
														anchor: new google.maps.Size(-7, -7),
														routeIndex: i,
														jqueryId: markerId,
														content: '<div id="' + markerId + '" class="secondary-marker">' +
																		'<img src="/assets/cuadrito.png"/>' +
																'</div>'
												});

												google.maps.event.addListener(marker, 'ready', function() {
														$('#' + this.jqueryId).hide();
														$('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );
												});
                    }


                    google.maps.event.addListener(marker, 'click', function() {
                        showRouteDetail(this.routeIndex);
                    });

                    routes[i].markers.push(marker);

                    if (j+1 < routes[i].locations.length) {

                        var stepLat = (routes[i].locations[j+1].lat - routes[i].locations[j].lat)/10;
												var stepLong = (routes[i].locations[j+1].long - routes[i].locations[j].long)/10;

												for(var stepIx = 1; stepIx <= 10; stepIx++){
													
													var lineArray = [							 
														new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long),
														new google.maps.LatLng(routes[i].locations[j].lat + (stepLat*stepIx), routes[i].locations[j].long + (stepLong*stepIx))
													];

													var line = new google.maps.Polyline({
														path: lineArray,
														strokeOpacity: 0,
														icons: [{
																icon: lineSymbol,
																offset: '0',
																repeat: '9px'
														}],
														clickable: false,
														geodesic: true,
														map: null

													});
												
													routes[i].lines.push(line);

												}
                    }

                }

            }

            $('#sidr ul li a').click(function(event){
                var routeIndex = $(event.target).attr('data-route-index');
                if(routeIndex){
                    showRouteDetail(routeIndex);
                    $.sidr('close', 'sidr');
                }
            });
            paintAllRoutes(0);
        },
        error: function(error) {
        }
    });
}

function paintAllRoutes(){
    paintingRoutes = true;

    for (var i=0; i<routes.length; i++) {
        paintOneRoute(i);
    }

    $('#simple-menu').css('visibility','visible');
}

function paintOneRoute(routeIndex) {
    if(routeIndex < routes.length){
        paintOneMarker(routeIndex, 0);
        setTimeout(function() {
            paintOneLine(routeIndex, 0);
        }, 100);
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
        }, 100)
    }
}

function showAllRoutes() {

    if(!paintingRoutes){
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
												animation: google.maps.Animation.DROP,
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
        $.sidr('close', 'sidr');
    }

}

function showRouteDetail(routeIndex){
    if (!paintingRoutes){

        $('#influencer-picture img').attr('src', routes[routeIndex].locations[0].recent_photo);
        $('#influencer-picture').fadeIn(1000);

        for (var i=0; i<tempRoute.length; i++) {
            tempRoute[i].setMap(null);
        }
        tempRoute = [];

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

                    routes[i].markers[j].setMap(map);
                    if (routes[i].lines[j]) {
                        routes[i].lines[j].setMap(map);
                    }

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
                        $('#' + this.jqueryId).click(function(){

                            for (var i=0; i<routes.length; i++) {
                                for (var j=0; j<routes[i].markers.length; j++) {
                                    if (routes[i].locations[j].id == richMarker.id) {
                                        if (routes[i].locations[j].pictures != undefined) {
                                            galleryPictures = routes[i].locations[j].pictures;
                                            showPictureGallery(galleryPictures);
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
                                                                showPictureGallery(galleryPictures);
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

function showPictureGallery(galleryPictures) {
    $('#gallery').show();
    $('#map_container').hide();

    $('#slick-carousel').unslick();
    $('#slick-carousel').html('');

    for(var itemIndex in galleryPictures){
        var content = '';

        var imgURL = galleryPictures[itemIndex].url_normal;
        var caption = galleryPictures[itemIndex].caption;
        var author_nickname = galleryPictures[itemIndex].author_nickname;
        var post_like = '';

        if (user) {
            if (hasLiked(galleryPictures[itemIndex].instagram_id)) {
                post_like = "<span>Ya te gusta esta foto</span>";
            } else {
                post_like = "<a href='#' onclick='likePhoto(" + galleryPictures[itemIndex].id + ")'>Me gusta</a>";
            }
        }

        content += "<div id='picture_" + galleryPictures[itemIndex].id + "'>" +
                        "<img src=\"" + imgURL + "\" alt=\"" + caption + "\">" +
                        "<span class='post'>" +
                            "<div class='post-background'></div>" +
                            "<h3>" + author_nickname + "</h3>" +
                            "<div class='post-like'>" + post_like + "</div>" +
                            "<p>" + caption + "</p>" +
                        "</span>" +
                    "</div>";

        $('#slick-carousel').append(content);

        if (user) {
            $('.post-like').show();
        } else {
            $('.post-like').hide();
        }
    }

    $('#slick-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        lazyLoad: 'ondemand'
    });

}

function hidePictureGallery() {
    $('#gallery').hide();
    $('#map_container').show();
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

function login() {
    $.ajax({
        beforeSend: function( xhr ) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        },
        type: "GET",
        url: "/users/auth/instagram",
        crossDomain: true,
        dataType: "jsonp",
        jsonpCallback: "callbackName",
        success: function(response) {
            if (response.success == true) {
                user = response.user;
                showDashboard();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus == 'parsererror') {
                window.location = '/users/auth/instagram';
            }
        }
    });
}

function showDashboard() {
    $("#login-btn").hide();
    $("#dashboard").show();
    $("#dashboard img").attr("src", user.picture);
    $("#user-name").html(user.nickname);
    $("#user-points").html(user.points);
    $("#user-photos").html(user.photos.length);
    $("#user-invites").text(user.invites);

    $("#user-photos").click(function() {
            showUserPictures();
    });

    if (!user.email) {
        console.log("no email");
    }
}

function showUserPictures(){
    if (user.photos.length > 0){
        $.sidr('close', 'sidr');
        showPictureGallery(user.photos);
    }
}

function hasLiked(instagram_id) {
    var liked = false;
    for (var i = 0; i < user.likes.length; i++) {
        if (user.likes[i] == instagram_id) {
            liked = true;
            break
        }
    }
    return liked;
}

function likePhoto(id) {
    $.ajax({
        beforeSend: function( xhr ) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        },
        type: "POST",
        url: "/photos/" + id + "/like",
        success: function(response) {
            $('#picture_' + id + ' .post-like').html("<span>Ya te gusta esta foto</span>");
            user.likes.push(response.instagram_id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

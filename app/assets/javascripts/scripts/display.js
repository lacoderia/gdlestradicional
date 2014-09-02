/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

var map = null;
var pano, panoInterval = null;
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
var tweet_guid = 0;

function init() {

    if (screen.width <= 768) {
        window.location = "/mobile";
    }

    if ($("#ruby-values").data("user")) {
        user = $("#ruby-values").data("user");
        showDashboard();
    }

    $('#news-feed').draggable({
        containment: "document"
    });

    $('#bottle').draggable({
        containment: "document"
    });

		$('#latest-pic').draggable({
				containment: "document"
		});

    $('#influencer-picture').draggable({
        containment: "document",
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
        scrollwheel: false,
        draggable: false,
        draggableCursor: 'default', 
        draggingCursor: 'default', 
        styles: styles
    }

		getLatestPictures();

		latestPicturesPositions.push(new google.maps.LatLng(20.626339,-103.394958));
		latestPicturesPositions.push(new google.maps.LatLng(20.693847,-103.332336));
		latestPicturesPositions.push(new google.maps.LatLng(20.659178,-103.414142));
		latestPicturesPositions.push(new google.maps.LatLng(20.643801,-103.380708));
		latestPicturesPositions.push(new google.maps.LatLng(20.690118,-103.306945));
		latestPicturesPositions.push(new google.maps.LatLng(20.630118,-103.306209)); 
		latestPicturesPositions.push(new google.maps.LatLng(20.692533,-103.346447));
		latestPicturesPositions.push(new google.maps.LatLng(20.690118,-103.332336));
		latestPicturesPositions.push(new google.maps.LatLng(20.650118,-103.310708)); 
		latestPicturesPositions.push(new google.maps.LatLng(20.692533,-103.394958));

    try {
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var rectangle = new google.maps.Rectangle({
            strokeColor: '#11384C',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#13435B',
            fillOpacity: 0.7,
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

        //google.maps.event.addListener(map, 'tilesloaded', drawAllRoutes);

        dispatcher = new WebSocketRails('104.130.128.19:3001/websocket');
        channel = dispatcher.subscribe('twitter_channel');

        channel.bind('new_tweet', function(data) {
            //console.log('channel event received: ' + data);
            tweet_guid++;

            var marker = new RichMarker({
                tweet_guid: tweet_guid,
                position: new google.maps.LatLng(data.location[0], data.location[1]),
                map: map,
                flat: true,
                anchor: new google.maps.Size(-20, -70),
                draggable: false,
                content: '<div class="tweet_marker tweet_marker_' + this.tweet_guid +'">' +
                    '<div class="tweet_marker_detail" style="display: none;"><span class="close_tweet">x</span><div class="arrow-down"></div><p class="author">@' + data.author + '</p><p>' + data.text + '</p></div>' +
                    '<div class="pin icon-uniE600"></div>' +
                    '<div class="pulse"></div>'+
                    '</div>'
            });

            google.maps.event.addListener(marker, 'click', function() {
                var tweet_marker_element = $('.tweet_marker_' + this.tweet_guid);
                tweet_marker_element.find('.tweet_marker_detail').show();

                var left = tweet_marker_element.find('.tweet_marker_detail').offset().left + tweet_marker_element.find('.tweet_marker_detail').outerWidth();
                var top = tweet_marker_element.find('.tweet_marker_detail').offset().top;

                var height = tweet_marker_element.find('.tweet_marker_detail').outerHeight();

                if(left > screenTop.width){
                    tweet_marker_element.find('.tweet_marker_detail').css('left',-(tweet_marker_element.find('.tweet_marker_detail').outerWidth()- tweet_marker_element.width()));
                    tweet_marker_element.find('.arrow-down').css('right', 10);

                    if(top < 0){
                        tweet_marker_element.find('.tweet_marker_detail').css('top', 50);
                        tweet_marker_element.find('.tweet_marker_detail').css('height', height);
                        tweet_marker_element.find('.arrow-down').removeClass('arrow-down').addClass('arrow-up');
                    }

                }else if(top < 0){
                    tweet_marker_element.find('.tweet_marker_detail').css('top', 50);
                    tweet_marker_element.find('.tweet_marker_detail').css('height', height);
                    tweet_marker_element.find('.arrow-down').removeClass('arrow-down').addClass('arrow-up');

                }

                tweet_marker_element.find('.close_tweet').click(function(event){
                    event.stopPropagation();
                    marker.setMap(null);
                    marker = null;
                });
                clearInterval(timer);
            });

            var timer = setTimeout(function(){
                marker.setMap(null);
                marker = null;
            }, 6000);

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

        });

    } catch(e) {
        console.log(e);
    }
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
				jqueryId: "latest-pic",
				content: '<div id="latest-pic"><div>#GDLESTRADICIONAL</div><img src="' + pic + '"/><div>'+ nickname +'</div></div>'
		});

		google.maps.event.addListener(marker, 'ready', function() {
  		$('#latest-pic').fadeIn(1000);    
		});
}

function showLatestPictures() {

	setTimeout(function(){

		createLatestPictureMarker(latestPictures[0].url_low, latestPictures[0].author_nickname);
		setTimeout(function(){
			$('#latest-pic').fadeOut(1000, function(){    
				$('#latest-pic').remove();
			});
		}, 5000);
		
		var start = 1;
		setInterval(function(){
			try {
				pic = latestPictures[start].url_low;
				createLatestPictureMarker(pic, latestPictures[start].author_nickname);
			} catch(e) {
				start = 0;
				pic = latestPictures[start].url_low;
				createLatestPictureMarker(pic, latestPictures[start].author_nickname);
			}
			setTimeout(function(){
				$('#latest-pic').fadeOut(1000, function(){    
					$('#latest-pic').remove();
				});
			}, 5000);
			start++;
		}, 10000);

	}, 5000);
}

function launchApp() {
    $('#intro').fadeOut(1000, function() {
        showElements = true;
        loadRoutes();
        $('#news-feed').fadeIn(1000);
        $('#bottle').fadeIn(1000);    
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
                routes[i].markers = new Array();
                routes[i].lines = new Array();

                var lineSymbol = {
									path: 'M 0,-0.5 0,0.5',
									strokeOpacity: 1,
									scale: 2.5
								};

                for(var j = 0; j < routes[i].locations.length; j++){
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

                    // Generamos las líneas de la ruta
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

            paintAllRoutes(0);
        },
        error: function(error) {
        }
    });
}

function paintAllRoutes(){
    for (var i=0; i<routes.length; i++) {
        paintOneRoute(i);
    }
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
    if (!paintingRoutes) {
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
                routes[i].markers[j] = [];

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
    }
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
    if (user) {
        $('#picture-gallery .post-like').css("display", "block");
        if (hasLiked(post.instagram_id)) {
            $('#picture-gallery .post-like').html("<span>Ya te gusta esta foto</span>");
        }
        else {
            $('#picture-gallery .post-like').html("<a href='#' onclick='likePhoto(" + post.id + ")'>Me gusta</a>");
        }
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
            $('#picture-gallery .post-like').html("<span>Ya te gusta esta foto</span>");
            user.likes.push(response.instagram_id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    }); 
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
    $("#influencer-video").attr('src','http://www.youtube.com/embed/XGSy3_Czz8k');
    $('#influencer-container').show();
}

function hideInfluencerGallery() {
    $('#overlay').hide();
    $("#influencer-video").attr('src','');
    $('#influencer-container').hide();
}

function influencerGalleryClick(e) {
    if (!$(e.target).closest('#influencer-gallery').get(0)) {
        hideInfluencerGallery();
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

function userPictureGalleryClick(e) {
    if (!$(e.target).closest('#user-picture-gallery').get(0)) {
        hideUserPictureGallery();
    }
}

function hideUserPictureGallery() {
    $('#overlay').hide();
    $('#user-picture-gallery-container').hide();

    pano = null;
    clearInterval(panoInterval);
}

function showUserPictures(){

	if (user.photos.length > 0){

		var post = user.photos[0];

		$('#user-picture-gallery .post-author').html(post.author_nickname);
    $('#user-picture-gallery p').html(post.caption);
    $('#user-marker-picture').attr('src', "");
    $('#user-marker-picture').attr('src', post.url_normal);
    $('#user-current-picture-id').val(post.id);

		var position = new google.maps.LatLng(post.lat, post.long);

		$('#overlay').show();
    $('#user-picture-gallery-container').show();

    var panoOptions = {
        position: position,
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
        document.getElementById('user-panorama'),
        panoOptions);

    panoInterval = window.setInterval(function() {
        var pov = pano.getPov();
        pov.heading += 0.1;
        pano.setPov(pov);
    }, 10);

	}

}

function userUpdatePictureDetails(post) {
    $('#userPicture-gallery .post-author').html(post.author_nickname);
    $('#user-picture-gallery p').html(post.caption);
    $('#user-marker-picture').attr('src', "");
    $('#user-marker-picture').attr('src', post.url_normal);
    $('#user-current-picture-id').val(post.id);
}

function userShowPreviousPicture() {
    var previousIndex = 0;
    for (var i=0; i<user.photos.length; i++) {
        if (user.photos[i].id == $('#user-current-picture-id').val()) {
            if (i-1 >= 0) {
                previousIndex = i-1;
            } else {
                previousIndex = user.photos.length - 1;
            }
            break;
        }
    }

    userUpdatePictureDetails(user.photos[previousIndex]);
}

function userShowNextPicture() {
    var nextIndex = 0;
    for (var i=0; i<user.photos.length; i++) {
        if (user.photos[i].id == $('#user-current-picture-id').val()) {
            if (i+1 < user.photos.length) {
                nextIndex = i+1;
            } else {
                nextIndex = 0;
            }
            break;
        }
    }

    console.log(routes);

    userUpdatePictureDetails(user.photos[nextIndex]);
}

function showDashboard() {
    $("#login-btn").css("display", "none");
    $("#dashboard").css("display", "block");
    $("#dashboard img").attr("src", user.picture);
    $("#user-name").text(user.nickname);
    $("#user-points").text(user.points);
    $("#user-photos").text(user.photos.length);
		$("#user-photos").click(showUserPictures);
    $("#user-invites").text(0);
    if (!user.email)
        console.log("no email");
}

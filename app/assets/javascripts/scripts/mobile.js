/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

/*
Estructura JSON de fotos de galería:
- id: ID de la foto (integer)
- gallery_id: ID de la galería a la que pertenece (integer)
- name: Nombre de la foto (string)
- description: Descripción de la foto (string)
- avatar: URL de la foto (string)
*/

var jcGallery = [
    {
        id: 1,
        name: 'galeria 1',
        photos: [
            {
                id: 1,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 2,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 3,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            }
        ]
    },
    {
        id: 2,
        name: 'galeria 2',
        photos: [
            {
                id: 4,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 5,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 6,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            }
        ]
    },
    {
        id: 3,
        name: 'galeria 3',
        photos: [
            {
                id: 7,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 8,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 9,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            }
        ]
    },
    {
        id: 4,
        name: 'galeria 4',
        photos: [
            {
                id: 10,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 11,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 12,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            }
        ]
    },
    {
        id: 5,
        name: 'galeria 5',
        photos: [
            {
                id: 13,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 14,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            },
            {
                id: 15,
                src: 'http://allaboutguadalajara.com/wp-content/uploads/Guad_Main.jpg',
                name: 'Nombre de la fotografía',
                description: 'Esta es la descripción de la fotografía de Guadalajara'
            }
        ]
    }
];

var map = null;
var rectangle = null;
var mapCenter = new google.maps.LatLng(20.68, -103.37);
var showElements = false;
var showAllRoutesZoom = false;
var paintingRoutes = true;
var routes = [];
var tempRoute = [];
var galleryPictures = null;
var dispatcher, channel = null;
var user;
var latestPictures = [];
var latestPicturesPositions = [];
var tweet_guid = 0;
var mailSent = false;
var intervalTimeout;
var markerMessageClosed = false;
var isIlluminationTweetActive = false;
var lightTweetMarkers = [];
var lineStrokeColor = '#000000';
var styles = [];
var dayStyles = [
    {
        "featureType":"water","elementType":"geometry","stylers":[{"color":"#4A6361"}]
    },
    {
        "featureType":"landscape","elementType":"geometry","stylers":[{"color":"#828785"},{"lightness": -20}]
    },
    {
        "featureType":"road","elementType":"geometry","stylers":[{"color":"#AAAAAA"},{"lightness": -33}]
    },
    {   "featureType": "road","elementType": "labels", "stylers": [{ "visibility": "on" },{"lightness": -50}]
    },
    {
        "featureType":"poi","elementType":"geometry","stylers":[{"color":"#455756"}, {"lightness": 5}, {"visibility": "on"}]
    },
    {
        "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#AAAAAA"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#1A2222"}]
    },
    {
        "featureType": "transit.station","elementType": "labels","stylers": [{ "color": "#808080" },{ "visibility": "off" }]
    }
];

var nightStyles = [
    {
        "featureType":"water","elementType":"geometry","stylers":[{"color":"#4A6361"},{"lightness": -60}]
    },
    {
        "featureType":"landscape","elementType":"geometry","stylers":[{"color":"#828785"},{"lightness": -60}]
    },
    {
        "featureType":"road","elementType":"geometry","stylers":[{"color":"#AAAAAA"},{"lightness": -65}]
    },
    {   "featureType": "road","elementType": "labels", "stylers": [{ "visibility": "on" },{"lightness": -70}]
    },
    {
        "featureType":"poi","elementType":"geometry","stylers":[{"color":"#2F3B3B"}, {"lightness": -15}, {"visibility": "on"}]
    },
    {
        "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }]
    },
    {   "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#AAAAAA"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#1A2222"}]
    },
    {
        "featureType": "transit.station","elementType": "labels","stylers": [{ "color": "#808080" },{ "visibility": "off" }]
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
    styles: styles,
    zoomControl: false
}

function init() {

    var headerHeight = $('header').outerHeight();

    isIlluminationTweetActive = $("#ruby-values").data("illumination");
    if(isIlluminationTweetActive){
        lineStrokeColor = '#ffffff';
        mapOptions.styles = nightStyles;
        styles = nightStyles;
    }else{
        lineStrokeColor = '#000000';
        mapOptions.styles = dayStyles;
        styles = dayStyles;
    }

    var mapHeight = $(window).height() - headerHeight;
    $('#map_container').height(mapHeight);
    $('#map-canvas').height(mapHeight);
    $('#gallery').height(mapHeight)

    $('.send-mail').click(function(event){
        event.preventDefault();
        var mail = $('#mail').val();
        if (validateEmail(mail)){
            sendMailInfo(mail);
        }else{
            $("#email-validation-field").html("email inválido")
        }
    });

    $('#terms-privacity').click(function(event){
        if(event.target.id == 'terms-privacity'){
            hideTermsPrivacity();
        }
    });

    $('#invites').click(function(event){
        if(event.target.id == 'invites'){
            hideInviteModal();
        }
    });

    $('#instragram-invite').click(function(event){
        if(event.target.id == 'instragram-invite'){
            hideInstragramModal();
        }
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

        if(isIlluminationTweetActive){
            showTweetIllumination();
        }else{
            hideTweetIllumination();
        }

        /*rectangle = new google.maps.Rectangle({
            strokeColor: '#033060​',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#033060​',
            fillOpacity: 0.6,
            clickable: false,
            map: map,
            bounds: new google.maps.LatLngBounds(
                new google.maps.LatLng(21.022869, -104.182047),
                new google.maps.LatLng(20.274966, -102.450327)
            )
        });*/

        google.maps.event.addListener(map, 'idle', function() {
            if (showAllRoutesZoom) {
                map.panTo(mapCenter);
                showAllRoutesZoom = false;
            }
        });

        dispatcher = new WebSocketRails('104.130.128.19:3001/websocket');
        channel = dispatcher.subscribe('twitter_channel');

        channel.bind('new_tweet', function(data) {

            tweet_guid++;

            var pinClass = 'pin';
            if(isIlluminationTweetActive){
                pinClass = 'pin-special';
            }

            var content = '<div class="tweet_marker tweet_marker_' + this.tweet_guid +'">' +
                '<div class="tweet_marker_detail" style="display: none;"><span class="close_tweet">x</span><div class="clearfix"></div><div class="arrow-down"></div><p class="author">@' + data.author + '</p><p>' + data.text + '</p></div>' +
                '<div class="' + pinClass + ' icon-uniE600"></div>' +
                '<div class="pulse"></div>'+
                '</div>';

            if(data.featured){
                content = '<div class="tweet_marker tweet_marker_' + this.tweet_guid +'">' +
                    '<div class="tweet_marker_detail" style="display: none;"><span class="close_tweet">x</span><div class="clearfix"></div><div class="arrow-down"></div><p class="author">@' + data.author + '</p><p>' + data.text + '</p></div>' +
                    '<div class="' + pinClass + ' icon-uniE600"></div>' +
                    '<div class="pulse-featured"></div>'+
                    '</div>';
            }

            var position = new google.maps.LatLng(data.lat, data.long);

            var marker = new RichMarker({
                tweet_guid: tweet_guid,
                position: position,
                map: map,
                flat: true,
                draggable: false,
                content: content
            });

            if(isIlluminationTweetActive){
                var delay = Math.floor(Math.random() * 5) + 1;
                var lightMarker = new RichMarker({
                    tweet_guid: tweet_guid,
                    position: position,
                    map: map,
                    flat: true,
                    draggable: false,
                    content: '<img class="tweet_light-' + delay + '" src="/assets/marca.png">'
                });

                lightTweetMarkers.push(lightMarker);
            }

            google.maps.event.addListener(marker, 'click', function() {

                clearInterval(timer);

                var tweet_marker_element = $('.tweet_marker_' + this.tweet_guid);
                tweet_marker_element.find('.tweet_marker_detail').show();

                var left = tweet_marker_element.find('.tweet_marker_detail').offset().left + tweet_marker_element.find('.tweet_marker_detail').outerWidth();
                var top = tweet_marker_element.find('.tweet_marker_detail').offset().top;

                var height = tweet_marker_element.find('.tweet_marker_detail').outerHeight();

                if(left > screen.width){
                    tweet_marker_element.find('.tweet_marker_detail').css('left',-(tweet_marker_element.find('.tweet_marker_detail').outerWidth()- tweet_marker_element.width()));
                    tweet_marker_element.find('.arrow-down').css('right', 10);

                    if(top < 100){
                        tweet_marker_element.find('.tweet_marker_detail').css('top', 50);
                        tweet_marker_element.find('.tweet_marker_detail').css('height', height);
                        tweet_marker_element.find('.arrow-down').removeClass('arrow-down').addClass('arrow-up');
                    }

                }else if(top < 100){
                    tweet_marker_element.find('.tweet_marker_detail').css('top', 50);
                    tweet_marker_element.find('.tweet_marker_detail').css('height', height);
                    tweet_marker_element.find('.arrow-down').removeClass('arrow-down').addClass('arrow-up');

                }

                tweet_marker_element.find('.close_tweet').click(function(event){
                    event.stopPropagation();

                    try{
                        marker.setMap(null);
                    }catch(e){
                        console.log(e)
                    }finally{
                        marker = null;
                    }
                });


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
                                $('#' + markerId + ' .image-marker-gallery-wrapper').hide();
                                $('#' + markerId + ' .image-marker-gallery-wrapper').attr('src', data.url_thumb);
                                $('#' + markerId + ' .image-marker-gallery-wrapper').fadeIn(1000);
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
                    post_like = "<span title='Me gusta' class='icon liked icon-uniE60A'></span>";
                } else {
                    post_like = "<a title='Me gusta' onclick='likePhoto(" + data.id + ")'><span class='icon unliked icon-uniE60A'></span></a>";
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
                $('.post-like').css('display','inline-block');

                if (data.author_id == user.uid){
                    user.photos.push(data);
                    showDashboard();
                }
            } else {
                $('.post-like').css('display','none');
            }

        });

    } catch(e) {
        console.log(e);
    }
}

function showTweetIllumination(){

    try{
        $.ajax({
            type: "GET",
            url: "/get_illumination.json",
            data: null,
            dataType: "json",
            success: function(response) {

                var initialTweets = response;

                for(var tweetIndex=0; tweetIndex<initialTweets.length; tweetIndex++){
                    var delay = Math.floor(Math.random() * 5) + 1;

                    var position = new google.maps.LatLng(initialTweets[tweetIndex].lat, initialTweets[tweetIndex].long);
                    var lightMarker = new RichMarker({
                        position: position,
                        map: map,
                        flat: true,
                        draggable: false,
                        content: '<img class="tweet_light-' + delay + '" src="/assets/marca.png">'
                    });
                    lightTweetMarkers.push(lightMarker);
                }

            },
            error: function(error) {
                console.log(error)
            }
        });

    }catch (e){
        console.log('Error');
    }

}

function hideTweetIllumination(){

    for(var tweetIndex=0; tweetIndex<lightTweetMarkers.length; tweetIndex++){
        lightTweetMarkers[tweetIndex].setMap(null);
    }
    lightTweetMarkers = [];
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
	intervalTimeout = setInterval(function(){
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

function stopLatestPictures(){
	clearTimeout(intervalTimeout);
}

function launchApp() {
    $('#intro').fadeOut(1000, function() {

        if(!mailSent){
            if (user && !user.email) {
                showMailModal();
                $('.footer').fadeIn(1000);
            }else{
                showElements = true;
                loadRoutes();
                $('.footer').fadeIn(1000);
                //showLatestPictures();
            }
        }else{
            showElements = true;
            loadRoutes();
            //showLatestPictures();
        }

        $('.account-button a').addClass('selected');
        $('#user-div').slideToggle('fast');
        if(typeof(Storage)!=="undefined") {
            if (typeof window.localStorage.showHelp === "undefined") {
                $('.helpButton').fadeIn(1000);
                window.localStorage.showHelp = false;
            }
        }

        if(isIlluminationTweetActive){
            $('.lightMessage').fadeIn(1000);
        }
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
                    scale: 2.5,
                    strokeColor: lineStrokeColor
                };

                for(var j = 0; j < routes[i].locations.length; j++){
                    var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);

                    var markerId = 'marker_' + i + '_' + j;
                    var markerImageUrl = '/assets/marker_azul.png';
                    var aditionalText = '';
                    var special = '';

                    if(isIlluminationTweetActive){
                        markerImageUrl = '/assets/marker_azul_ilumina.png';
                        if(routes[i].locations[j].especial){
                            markerImageUrl = '/assets/marker_azul_amarillo_ilumina.png';
                            aditionalText = '<p>Enfoque Tradicional</p>'
                            special = 'special';
                        }
                    }else{
                        if(routes[i].locations[j].especial){
                            markerImageUrl = '/assets/marker_azul_amarillo.png';
                            aditionalText = '<p>Enfoque Tradicional</p>'
                            special = 'special';
                        }
                    }

                    if (j == 0) {

                        var marker = new RichMarker({
                            position: routeCoordinate,
                            map: map,
                            flat: true,
                            anchor: new google.maps.Size(-16, -44),
                            draggable: false,
                            routeIndex: i,
                            jqueryId: markerId,
                            content: '<div id="' + markerId + '" class="first-marker marker">' +
                                '<div class="marker_detail"><span class="close_tweet">x</span><div class="arrow-down"></div>' + aditionalText + '<p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p><div class="image-marker-gallery-wrapper"><img src="" class="image-marker-gallery"></div><a class="image-marker-galllery-link">Ver más fotos</a></div>' +
                                '<img class="image-marker-click" src="' + markerImageUrl + '"/>' +
                                '<div class="route-name">' + routes[i].name + '</div>' +
                                '</div>'
                        });

                        google.maps.event.addListener(marker, 'ready', function() {
                            $('#' + this.jqueryId).hide();
                            $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );
                        });

                    } else {

                        var markerImageUrl = '/assets/cuadrito_gris.png';
                        var aditionalText = '';

                        if(routes[i].locations[j].especial){
                            markerImageUrl = '/assets/cuadrito_amarillo.png';
                            aditionalText = '<p>Enfoque Tradicional</p>'
                        }

                        // Si no es el primer punto pintamos un cuadro
                        var marker = new RichMarker({
                            position: routeCoordinate,
                            map: null,
                            draggable: false,
                            flat: true,
                            anchor: new google.maps.Size(-7, -7),
                            routeIndex: i,
                            jqueryId: markerId,
                            content: '<div id="' + markerId + '" class="secondary-marker marker">' +
                                '<div class="marker_detail"><span class="close_tweet">x</span><div class="clearfix"></div><div class="arrow-down"></div>' + aditionalText + '<p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p><div class="image-marker-gallery-wrapper"><img src="" class="image-marker-gallery"></div><a class="image-marker-galllery-link">Ver más fotos</a></div>' +
                                '<img class="image-marker-click" src="' + markerImageUrl + '"/>' +
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

                        var stepLat = (routes[i].locations[j+1].lat - routes[i].locations[j].lat)/5;
                        var stepLong = (routes[i].locations[j+1].long - routes[i].locations[j].long)/5;

                        for(var stepIx = 1; stepIx <= 5; stepIx++){

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
            paintAllRoutes();
        },
        error: function(error) {
        }
    });
}

function paintAllRoutes(){

    for (var i=0; i<routes.length; i++) {
        if (routes[i].markers[0]) {
            routes[i].markers[0].setMap(map);
        }
    }

    paintingRoutes = false;

    $('#simple-menu').css('visibility','visible');
}

function paintOneRoute(routeIndex) {
    if(routeIndex < routes.length && !paintingRoutes){
        paintingRoutes = true;

        for (var j=0; j<routes[routeIndex].lines.length; j++) {
            routes[routeIndex].lines[j].setMap(null);
        }

        for (var j=0; j<routes[routeIndex].markers.length; j++) {
            routes[routeIndex].markers[j].setMap(null);
        }

        paintOneMarker(routeIndex, 0);
        setTimeout(function() {
            paintOneLine(routeIndex, 0);
        }, 50);
    }
}

function paintOneMarker(routeIndex, markerIndex) {
    if(markerIndex < routes[routeIndex].locations.length){
        routes[routeIndex].markers[markerIndex].setMap(map);
        setTimeout(function(){
            paintOneMarker(routeIndex, markerIndex+1);
        }, 250)
    } else {
        paintingRoutes = false;
        $('.lightMessage').hide();
        if(!markerMessageClosed){
            $('.touchMarkerMessage').show();
        }

        for (var j=0; j<routes[routeIndex].markers.length; j++) {

            var routeCoordinate = new google.maps.LatLng(routes[routeIndex].locations[j].lat, routes[routeIndex].locations[j].long);
            var markerId = 'marker_' + routeIndex + '_' + j;

            var src = '/assets/logo_cuervo.png';
            var defaultPhoto = true;

            if (routes[routeIndex].locations[j].recent_photo) {
                src = routes[routeIndex].locations[j].recent_photo;
                defaultPhoto = false;
            }

            var marker = new RichMarker({
                index: j,
                pictures: routes[routeIndex].locations[j].pictures,
                position: routeCoordinate,
                map: map,
                flat: true,
                anchor: RichMarkerPosition.TOP,
                draggable: false,
                id: routes[routeIndex].locations[j].id,
                jqueryId : markerId,
                recent_photo: src,
                default_photo: defaultPhoto
            });

            google.maps.event.addListener(marker, 'ready', function() {

                var richMarker = this;
                if(!richMarker.default_photo){
                    $('#' + richMarker.jqueryId).find('.image-marker-galllery-link').html('Ver más fotos');
                    $('#' + richMarker.jqueryId).find('.image-marker-gallery').click(function(){
                        showGalleryByMarker(richMarker);
                    });
                    $('#' + richMarker.jqueryId).find('.image-marker-galllery-link').addClass('link');
                }else{
                    $('#' + richMarker.jqueryId).find('.image-marker-galllery-link').html('Sube la primera foto de este lugar en Instagram usando el hashtag #GDLesTradicional');
                    $('#' + richMarker.jqueryId).find('.image-marker-galllery-link').removeClass('link');
                }


                $('#' + this.jqueryId + ' .image-marker-click').click(function(){
                    hideMarkerMessage();
                    if(!$('#' + richMarker.jqueryId).find('.marker_detail').is(':visible')){
                        $('.marker_detail').hide();
                        $('#' + richMarker.jqueryId).find('.image-marker-gallery').attr('src',richMarker.recent_photo);
                        $('#' + richMarker.jqueryId).find('.marker_detail').show();

                    }else{
                        $('#' + richMarker.jqueryId).find('.marker_detail').hide();
                    }

                });

                $('#' + this.jqueryId + ' .close_tweet').click(function(){
                    $('#' + richMarker.jqueryId).find('.marker_detail').hide();
                    hideMarkerMessage();
                });



                $('#' + richMarker.jqueryId).find('.image-marker-galllery-link').click(function(){
                    showGalleryByMarker(richMarker);
                });

            });

            tempRoute.push(marker);
        }

        for (var j=0; j<routes[routeIndex].markers.length; j++) {
            google.maps.event.clearListeners(routes[routeIndex].markers[j], 'click');
        }

        var mapOptionsRouteDetail = {
            minZoom: 11,
            maxZoom: 19,
            disableDefaultUI: true,
            disableDoubleClickZoom: false,
            scrollwheel: true,
            draggable: true,
            styles: styles,
            panControl:false,
            zoomControl:true,
            zoomControlOptions: {
                position:google.maps.ControlPosition.RIGHT_BOTTOM
            }
        }

        map.setOptions(mapOptionsRouteDetail);
    }
}

function showGalleryByMarker(richMarker){
    if(typeof richMarker.pictures != 'undefined'){
        galleryPictures = richMarker.pictures;
        showPictureGallery(galleryPictures);
    }else{
        $.ajax({
            type: "GET",
            url: "/locations/" + richMarker.id + "/gallery.json",
            data: null,
            dataType: "json",
            success: function (response) {
                console.log(richMarker.id)
                for (var i = 0; i < routes.length; i++) {
                    for (var j = 0; j < routes[i].markers.length; j++) {
                        if (routes[i].locations[j].id == richMarker.id) {
                            routes[i].locations[j].pictures = sortGalleryPictures(response);
                            galleryPictures = routes[i].locations[j].pictures;
                            showPictureGallery(galleryPictures);
                        }
                    }
                }
            },
            error: function (error) {
                console.log('ERROR' + ' ' + error)
            }
        });
    }
}

function paintOneLine(routeIndex, lineIndex) {
    if(lineIndex < routes[routeIndex].lines.length){
        routes[routeIndex].lines[lineIndex].setMap(map);
        setTimeout(function(){
            paintOneLine(routeIndex, lineIndex+1);
        }, 50)
    }
}

function showAllRoutes() {

    if(!paintingRoutes){

	    //showLatestPictures();

        $('#influencer-picture').hide();
        $('.touchMarkerMessage').hide();
        if(isIlluminationTweetActive){
            $('.lightMessage').show();
        }

        for (var i=0; i<tempRoute.length; i++) {
            tempRoute[i].setMap(null);
        }
        tempRoute = [];

        for (var i=0; i<routes.length; i++) {
            for (var j=0; j<routes[i].lines.length; j++) {
                routes[i].lines[j].setMap(null);
            }

            for (var j=0; j<routes[i].markers.length; j++) {
                routes[i].markers[j].setMap(null);
                routes[i].markers[j] = [];

                var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);

                var markerId = 'marker_' + i + '_' + j;
                var special = '';

                if (j == 0) {
                    var markerImageUrl = '/assets/marker_azul.png';
                    var aditionalText = '';

                    if(isIlluminationTweetActive){
                        markerImageUrl = '/assets/marker_azul_ilumina.png';
                        if(routes[i].locations[j].especial){
                            markerImageUrl = '/assets/marker_azul_amarillo_ilumina.png';
                            aditionalText = '<p>Enfoque Tradicional</p>'
                            special = 'special';
                        }
                    }else{
                        if(routes[i].locations[j].especial){
                            markerImageUrl = '/assets/marker_azul_amarillo.png';
                            aditionalText = '<p>Enfoque Tradicional</p>'
                            special = 'special';
                        }
                    }

                    var marker = new RichMarker({
                        position: routeCoordinate,
                        map: map,
                        flat: true,
                        anchor: new google.maps.Size(-20, -70),
                        draggable: false,
                        routeIndex: i,
                        jqueryId: markerId,
                        content: '<div id="' + markerId + '" class="first-marker marker">' +
                            '<div class="marker_detail"><div class="arrow-down"></div>' + aditionalText + '<p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p></div>' +
                            '<img src="' + markerImageUrl + '"/>' +
                            '<div class="route-name">' + routes[i].name + '</div>' +
                            '</div>'
                    });

                } else {

                    var markerImageUrl = '/assets/cuadrito_gris.png';
                    var aditionalText = '';

                    if(routes[i].locations[j].especial){
                        markerImageUrl = '/assets/cuadrito_amarillo.png';
                        aditionalText = '<p>Enfoque Tradicional</p>'
                    }

                    var marker = new RichMarker({
                        position: routeCoordinate,
                        map: null,
                        flat: true,
                        anchor: new google.maps.Size(-8, -8),
                        draggable: false,
                        routeIndex: i,
                        jqueryId: markerId,
                        content: '<div id="' + markerId + '" class="secondary-marker marker">' +
                            '<div class="marker_detail"><div class="arrow-down"></div>' + aditionalText + '<p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p></div>' +
                            '<img src="' + markerImageUrl + '"/>' +
                            '</div>'
                    });

                }

                google.maps.event.addListener(marker, 'ready', function() {
                    $('#' + this.jqueryId).hide();
                    $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );
                });

                google.maps.event.addListener(marker, 'click', function() {
                    showRouteDetail(this.routeIndex);
                });

                routes[i].markers[j] = marker;
            }
        }

        showAllRoutesZoom = true;
        map.setOptions(mapOptions);
        map.setZoom(13);
        $.sidr('close', 'sidr');
    }

}

function showRouteDetail(routeIndex){
    if (!paintingRoutes){
        stopLatestPictures();

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

        paintOneRoute(routeIndex);

        $('#news-feed').hide();
        $('#influencer-video').hide();

        var influencerInfo = routes[routeIndex].influencer;
        if(influencerInfo.is_especial){
            $('.image-route').hide();
            $('.image-influencer').show();
        }else{
            $('.image-influencer').hide();
            $('.image-route').show();
        }
        $('.influencer-title').html(influencerInfo.name);
        $('.influencer-description').html(influencerInfo.description);
        $('.influencer-video').attr('src','');

        if(typeof influencerInfo.video_url != 'undefined'){
            if(influencerInfo.video_url){
                $('#influencer-video').attr('src','http://www.youtube.com/embed/' + influencerInfo.video_url);
                $('#influencer-video').show();
            }
        }

        $('#influencer-picture').fadeIn(1000);

        for (var i=0; i<tempRoute.length; i++) {
            tempRoute[i].setMap(null);
        }
        tempRoute = [];

    }
}

function showHelpGallery() {
    $('.touchMarkerMessage').hide();
    $('.lightMessage').hide();
    $('#help-gallery').show();
    $('#map_container').hide();
    $('#help-slick-carousel').unslick();
    $('#help-slick-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.footer').hide();

    $('.helpButton').hide();
}

function hideHelpGallery() {
    $('#help-gallery').hide();
    $('#map_container').show();
    if(!markerMessageClosed){
        $('.touchMarkerMessage').show();
    }
}

/** JC Gallery **/

function showJCGalleryThumbs() {
    hideHelpGallery();
    hideJCGallery();

    $('#overlay').show();
    $('#mobile-jc-gallery-thumbs').show();

    $('#mobile-jc-gallery-thumbs .mobile-jc-gallery-thumbs-container').html('');

    for (var i=0; i<jcGallery.length; i++) {
        var galleryElement = '<div class="mobile-gallery-cell">' +
            '<img src="' + jcGallery[i].photos[0].src + '" onclick="showJCGallery(' + i + ')">' +
            '<div class="jc-gallery-name">' + jcGallery[i].name + '</div>' +
            '</div>';

        $('#mobile-jc-gallery-thumbs .mobile-jc-gallery-thumbs-container').append(galleryElement);
    }
}

function hideJCGalleryThumbs() {
    $('#overlay').hide();
    $('#mobile-jc-gallery-thumbs').hide();
}

function showJCGallery(galleryIndex) {
    hideJCGalleryThumbs();

    $('#overlay').show();
    $('#mobile-jc-gallery').show();

    $('#jc-slick-carousel').unslick();
    $('#jc-slick-carousel').html('');

    for(var itemIndex in jcGallery[galleryIndex].photos){
        var content = '<div class="jc-slick-carousel-slide">' +
                        '<img src="' + jcGallery[galleryIndex].photos[itemIndex].src + '">' +
                        '<div class="jc-photo-name">' + jcGallery[galleryIndex].photos[itemIndex].name + '</div>' +
                        '<div class="jc-photo-description">' + jcGallery[galleryIndex].photos[itemIndex].description + '</div>' +
                   '</div>';

        $('#jc-slick-carousel').append(content);
    }

    $('#jc-slick-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        lazyLoad: 'ondemand'
    });
}

function hideJCGallery() {
    $('#overlay').hide();
    $('#mobile-jc-gallery').hide();
}

function showPictureGallery(galleryPictures) {
    hideHelpGallery();
    if (galleryPictures.length) {
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
                    post_like = "<span title='Me gusta' class='icon liked icon-uniE60A'></span>";
                } else {
                    post_like = "<a title='Me gusta' onclick='likePhoto(" + galleryPictures[itemIndex].id + ")'><span class='icon unliked icon-uniE60A'></span></a>";
                }
            }

            content += "<div id='picture_" + galleryPictures[itemIndex].id + "'>" +
                "<img src=\"" + imgURL + "\" alt=\"" + caption + "\">" +
                "<div class=\"gallery-message\"><p>Desliza para ver más</p></div>" +
                "<span class='post'>" +
                "<div class='post-background'></div>" +
                "<h3>" + author_nickname + "</h3>" +
                "<div class='post-like'>" + post_like + "</div>" +
                "<p>" + caption + "</p>" +
                "</span>" +
                "</div>";

            $('#slick-carousel').append(content);

            if (user) {
                $('.post-like').css('display','inline-block');
            } else {
                $('.post-like').css('display','none');
            }
        }

        $('#slick-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            lazyLoad: 'ondemand'
        });
    }

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

function login() {
    $('#login-btn').hide();
    $('.instagram-loader').show();

     ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'button',   // Required.
      'eventAction': 'click',      // Required.
      'eventLabel': 'JCTuser',
     });

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
                $('.instagram-loader').hide();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus == 'parsererror') {
                window.location = '/relocated';
                $('#login-btn').show();
                $('.instagram-loader').hide();
            }
        }
    });
}

function logout() {
    window.location.replace("/logout");
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
}

function showUserPictures(){
    if (user.photos.length > 0){
        $.sidr('close', 'sidr');
        showPictureGallery(user.photos);
    } else {
        showInstragramModal();
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
            $('#picture_' + id + ' .post-like').html("<span title='Me gusta' class='icon liked icon-uniE60A'></span>");
            user.likes.push(response.instagram_id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function showInviteModal() {
    var tweet = 'Únete al movimiento';
    var inviteURL = 'http%3A%2F%2Fgdlestradicional.mx%3Finvite%3D' + user.uid;  //'http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIn_Watermelon_Sugar';
    var intent = 'https://twitter.com/intent/tweet?text=' + tweet + '&hashtags=GDLESTRADICIONAL&url='+ inviteURL;
    $.sidr('close', 'sidr');
    $('#invites').fadeIn(500);
    $(".share-buttons .tw").attr('href', intent);
}

function hideInviteModal(){
    $.sidr('close', 'sidr');
    $('#invites').fadeOut(500);
}

function hideInstragramModal(){
    $('#instragram-invite').fadeOut(500);
}

function showInstragramModal(){
    $.sidr('close', 'sidr');
    $('#instragram-invite').fadeIn(500);
}

function showMailModal(){
    $.sidr('close', 'sidr');
    $('#mail-form').fadeIn(500);
}

function hideMailModal(){
    $('#mail-form').fadeOut(500);
    launchApp();
}

function sendMailInfo(mail){
    if(mail){
        var serviceURL = '/users/' + user.id + '/update_mail';
        var data = {"email":mail}
        $.ajax({
            type: "POST",
            url:  serviceURL,
            data: data,
            dataType: "json",
            success: function(response) {
                mailSent = true;
                $('.mail-message').fadeOut(500, function(){
                    $('.success-message').fadeIn(500);
                });
            },
            error: function(error) {
                console.log(error)
            }
        });
    }
}

function showTermsPrivacity(){
    $('#terms-privacity').show();
}

function hideTermsPrivacity(){
    $('#terms-privacity').hide();
}

function hideMarkerMessage(){
    $('.touchMarkerMessage').hide();
    markerMessageClosed = true;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function trackIG() {
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'button',   // Required.
      'eventAction': 'click',      // Required.
      'eventLabel': 'JCT',
    });
}

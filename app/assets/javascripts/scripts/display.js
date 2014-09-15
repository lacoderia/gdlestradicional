/**
 * Created by schultzRr on 13/08/14.
 */

$(document).ready(
    init
);

var map = null;
var rectangle = null;
var pano, panoInterval, userPano, userPanoInterval = null;
var mapCenter = new google.maps.LatLng(20.7, -103.39);
var showElements = false;
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
var intervalTimeout, latestPicturesTimeout;

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
    styles: styles,
    zoomControl: false
}

function init() {

    if (screen.width < 768) {
        window.location = "/mobile";
    }

    $('.account-button').click(function(){
        if(!$('#user-div').is(':visible')){
            $('.nav-container-item').hide();
            $('.icon-list-item a.selected').removeClass('selected');
        }
        $('.account-button a').addClass('selected');
        $('#user-div').slideToggle('fast', function(){
            if(!$('#user-div').is(':visible')){
                $('.account-button a').removeClass('selected');
            }
        });

    });


    $('.newsfeed-button').click(function(){
        if(!$('#news-feed').is(':visible')){
            $('.nav-container-item').hide();
            $('.icon-list-item a.selected').removeClass('selected');
        }
        $('.newsfeed-button a').addClass('selected');
        $('.news-feed-canvas').css('height', $('#map-canvas').height() - 250)
        $('#news-feed').slideToggle('fast', function(){
            if(!$('#news-feed').is(':visible')){
                $('.newsfeed-button a').removeClass('selected');
            }
        });
    });

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

    if ($("#ruby-values").data("user")) {
        user = $("#ruby-values").data("user");
        showDashboard();
    }

    $('#latest-pic').draggable({
        containment: "document"
    });

    $('#influencer-picture').draggable({
        containment: "document",
        stop: function(event, ui) {
            $( event.toElement ).one('click', function(e){ e.stopImmediatePropagation(); } );
        }
    });

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

        rectangle = new google.maps.Rectangle({
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
        });


        // Se agrega el mapa de calor al mapa y se declara el arreglo de puntos para alimentarlo
        /*var tweetData = [];
         tweetData = [
         new google.maps.LatLng(20.669134, -103.368372),
         new google.maps.LatLng(20.669295, -103.366741),
         new google.maps.LatLng(20.669937, -103.364510),
         new google.maps.LatLng(20.670098, -103.361763),
         new google.maps.LatLng(20.670098, -103.361763),
         new google.maps.LatLng(20.670098, -103.361763),
         new google.maps.LatLng(20.643801,-103.380708),
         new google.maps.LatLng(20.669455, -103.358759),
         new google.maps.LatLng(20.668893, -103.357472),
         new google.maps.LatLng(20.669215, -103.357214),
         new google.maps.LatLng(20.667368, -103.356442),
         new google.maps.LatLng(20.667689, -103.355068),
         new google.maps.LatLng(20.667689, -103.353180),
         new google.maps.LatLng(20.666243, -103.352493),
         new google.maps.LatLng(20.665440, -103.352408),
         new google.maps.LatLng(20.664717, -103.352923),
         new google.maps.LatLng(20.664316, -103.353695),
         new google.maps.LatLng(20.664316, -103.353695),
         new google.maps.LatLng(20.664316, -103.353695),
         new google.maps.LatLng(20.669134, -103.368372),
         new google.maps.LatLng(20.669295, -103.366741),
         new google.maps.LatLng(20.663191, -103.370861),
         new google.maps.LatLng(20.661826, -103.369831),
         new google.maps.LatLng(20.661425, -103.367771),
         new google.maps.LatLng(20.660943, -103.364767),
         new google.maps.LatLng(20.661023, -103.362793),
         new google.maps.LatLng(20.661103, -103.359703),
         new google.maps.LatLng(20.661666, -103.356356),
         new google.maps.LatLng(20.659015, -103.357987),
         new google.maps.LatLng(20.657891, -103.357987),
         new google.maps.LatLng(20.654759, -103.357815),
         new google.maps.LatLng(20.654277, -103.359961),
         new google.maps.LatLng(20.652671, -103.361420),
         new google.maps.LatLng(20.652671, -103.361420),
         new google.maps.LatLng(20.653795, -103.368801),
         new google.maps.LatLng(20.667368, -103.336443),
         new google.maps.LatLng(20.667127, -103.335585),
         new google.maps.LatLng(20.665039, -103.335499),
         new google.maps.LatLng(20.640382, -103.372406),
         new google.maps.LatLng(20.640623, -103.375925),
         new google.maps.LatLng(20.640302, -103.379015),
         new google.maps.LatLng(20.636687, -103.378758),
         new google.maps.LatLng(20.636807, -103.380968),
         new google.maps.LatLng(20.635642, -103.383028),
         new google.maps.LatLng(20.634598, -103.385346)
         ];

         var pointArray = new google.maps.MVCArray(tweetData);

         var heatmap = new google.maps.visualization.HeatmapLayer({
         data: pointArray,
         opacity: 1,
         radius: 20,
         });

         heatmap.setMap(map);*/


        dispatcher = new WebSocketRails('104.130.128.19:3001/websocket');
        channel = dispatcher.subscribe('twitter_channel');

        channel.bind('new_tweet', function(data) {

            tweet_guid++;

            var content = '<div class="tweet_marker tweet_marker_' + this.tweet_guid +'">' +
                '<div class="tweet_marker_detail" style="display: none;"><span class="close_tweet">x</span><div class="arrow-down"></div><p class="author">@' + data.author + '</p><p>' + data.text + '</p></div>' +
                '<div class="pin icon-uniE600"></div>' +
                '<div class="pulse"></div>'+
                '</div>';

            if(data.featured){
                content = '<div class="tweet_marker tweet_marker_' + this.tweet_guid +'">' +
                    '<div class="tweet_marker_detail" style="display: none;"><span class="close_tweet">x</span><div class="arrow-down"></div><p class="author">@' + data.author + '</p><p>' + data.text + '</p></div>' +
                    '<div class="pin icon-uniE600"></div>' +
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

            //console.log(position)

            /*var circle = new google.maps.Circle({
             strokeColor: '#FF0000',
             strokeOpacity: 0.35,
             strokeWeight: 2,
             fillColor: '#FF0000',
             fillOpacity: 0.35,
             center: position,
             radius: 200
             });

             circle.setMap(map);*/


            //pointArray.push(position);

            google.maps.event.addListener(marker, 'click', function() {
                var tweet_marker_element = $('.tweet_marker_' + this.tweet_guid);
                tweet_marker_element.find('.tweet_marker_detail').show();

                var left = tweet_marker_element.find('.tweet_marker_detail').offset().left + tweet_marker_element.find('.tweet_marker_detail').outerWidth();
                var top = tweet_marker_element.find('.tweet_marker_detail').offset().top;

                var height = tweet_marker_element.find('.tweet_marker_detail').outerHeight();

                if(left > screen.width){
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

            if (user) {
                if (data.author_id == user.uid){
                    user.photos.push(data);
                    sortGalleryPictures(user.photos);
                    showDashboard();
                }
            }

        });

    } catch(e) {
        console.log(e);
    }
}

function showHelpGallery() {
    $('#help-gallery-container').show();
    $('#help-slick-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true
    });
    $('.helpButton').hide();
}

function hideHelpGallery() {
    $('#help-gallery-container').hide();
}

function helpGalleryClick(e) {
    if (!$(e.target).closest('#help-gallery').get(0)) {
        hideHelpGallery();
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
    latestPictures.push({
        instagram_id:'786286069276426306_4290975', caption:'Mykonos in Tlaquepaque #scouting #gdlestradicional #museum #brothers #lovemyjob #youbetterwork', author_id:'4290975', author_nickname:'paulorendain', lat:20.68734075, long:-103.264199421, url_low:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10616964_615864088534897_1350848748_a.jpg', url_thumb:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10616964_615864088534897_1350848748_s.jpg', url_normal:'http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10616964_615864088534897_1350848748_n.jpg'
    })
    latestPicturesTimeout = setTimeout(function(){

        //createLatestPictureMarker(latestPictures[0].url_low, latestPictures[0].author_nickname);
        setTimeout(function(){
            $('#latest-pic').fadeOut(1000, function(){
                $('#latest-pic').remove();
            });
        }, 5000);

        var start = 1;
        intervalTimeout = setInterval(function(){
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

function stopLatestPictures(){
    clearTimeout(latestPicturesTimeout);
    clearInterval(intervalTimeout);
}

function launchApp() {


    $('#intro').fadeOut(1000, function() {

        if(!mailSent){
            if (user && !user.email) {
                showMailModal();
            }else{
                showElements = true;
                loadRoutes();
                $('.nav').fadeIn(1000);
                $('.social-networks-icons').fadeIn(1000);
                $('#bottle').fadeIn(1000);
                $('.footer').fadeIn(1000);
                showLatestPictures();
            }
        }else{
            showElements = true;
            loadRoutes();
            $('.nav').fadeIn(1000);
            $('.social-networks-icons').fadeIn(1000);
            $('#bottle').fadeIn(1000);
            $('.footer').fadeIn(1000);
            showLatestPictures();
        }

            $('.account-button a').addClass('selected');
            $('#user-div').slideToggle('fast');

            if(typeof(Storage)!=="undefined") {
                if (typeof window.localStorage.showHelp === "undefined") {
                    $('.helpButton').fadeIn(1000);
                    window.localStorage.showHelp = false;
                }


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
                routes[i].markers = new Array();
                routes[i].lines = new Array();

                var lineSymbol = {
                    path: 'M 0,-0.5 0,0.5',
                    strokeOpacity: 1,
                    scale: 2.5
                };

                for(var j = 0; j < routes[i].locations.length; j++){
                    var routeCoordinate = new google.maps.LatLng(routes[i].locations[j].lat, routes[i].locations[j].long);
                    var markerId = 'marker_' + i + '_' + j;
                    var markerImageUrl = '/assets/marker_azul.png';
                    var aditionalText = '';

                    if(routes[i].locations[j].especial){
                        markerImageUrl = '/assets/marker_azul_amarillo.png';
                        aditionalText = '<p>Enfoque Tradicional</p>'
                    }

                    if (j == 0) {
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

                        google.maps.event.addListener(marker, 'ready', function() {
                            $('#' + this.jqueryId).hide();
                            $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );

                            $('#' + this.jqueryId).mouseover(function(){
                                var marker_element = $(this);
                                marker_element.find('.route-name').show();
                                marker_element.parent().parent().css('z-index', 1000);
                            });

                            $('#' + this.jqueryId).mouseout(function() {
                                var marker_element = $(this);
                                marker_element.find('.route-name').hide();
                                marker_element.parent().parent().css('z-index','auto');
                            });
                        });

                    } else {

                        // Si no es el primer punto pintamos un cuadro

                        var markerImageUrl = '/assets/cuadrito_gris.png';
                        var aditionalText = '';

                        if(routes[i].locations[j].especial){
                            markerImageUrl = '/assets/cuadrito_amarillo.png';
                            aditionalText = '<p>Enfoque Tradicional</p>'
                        }

                        var marker = new RichMarker({
                            position: routeCoordinate,
                            map: null,
                            draggable: false,
                            flat: true,
                            anchor: new google.maps.Size(-8, -8),
                            routeIndex: i,
                            jqueryId: markerId,
                            content: '<div id="' + markerId + '" class="secondary-marker marker">' +
                                '<div class="marker_detail"><div class="arrow-down"></div>' + aditionalText + '<p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p></div>' +
                                '<img src="' + markerImageUrl + '"/>' +
                                '</div>'
                        });

                        google.maps.event.addListener(marker, 'ready', function() {
                            $('#' + this.jqueryId).hide();
                            $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );
                        });
                    }

                    google.maps.event.clearListeners(marker, 'click');

                    google.maps.event.addListener(marker, 'click', function() {
                        showRouteDetail(this.routeIndex);
                    });

                    routes[i].markers.push(marker);

                    // Generamos las líneas de la ruta
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
}

function paintOneRoute(routeIndex) {
    if(routeIndex < routes.length){
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

        $('#show-all-routes').show();

        for (var j=0; j<routes[routeIndex].markers.length; j++) {

            var routeCoordinate = new google.maps.LatLng(routes[routeIndex].locations[j].lat, routes[routeIndex].locations[j].long);
            var markerId = 'image_marker_' + routeIndex + '_' + j;

            if (routes[routeIndex].locations[j].recent_photo) {
                var src = routes[routeIndex].locations[j].recent_photo;
            } else {
                var src = '/assets/logo_cuervo.png';
            }

            var marker = new RichMarker({
                index: j,
                position: routeCoordinate,
                map: map,
                flat: true,
                anchor: RichMarkerPosition.TOP,
                draggable: true,
                id: routes[routeIndex].locations[j].id,
                jqueryId : markerId,
                content: '<div class="image-marker my-marker" id="' + markerId + '">' +
                    '<img src="' + src + '"/>' +
                    '</div>'
            });

            google.maps.event.addListener(marker, 'ready', function() {
                var richMarker = this;
                $('#' + this.jqueryId).hide();
                var time = (this.index+1) * 250;
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
                                    showPictureGallery();
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
                                                        showPictureGallery();
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

        for (var j=0; j<routes[routeIndex].markers.length; j++) {
            google.maps.event.clearListeners(routes[routeIndex].markers[j], 'click');

            $('#' + routes[routeIndex].markers[j].jqueryId).mouseout();
            $('#' + routes[routeIndex].markers[j].jqueryId).unbind('mouseover mouseout');

            $('#' + routes[routeIndex].markers[j].jqueryId).mouseover(function(){

                var marker_element = $(this);
                marker_element.find('.marker_detail').show();

                var left = marker_element.find('.marker_detail').offset().left + marker_element.find('.marker_detail').outerWidth();
                var top = marker_element.find('.marker_detail').offset().top;

                var height = marker_element.find('.marker_detail').outerHeight();

                if(left > screen.width){
                    marker_element.find('.marker_detail').addClass('horizontal-inverted');
                    marker_element.find('.arrow-down').addClass('inverted');

                    if(top < 0){
                        marker_element.find('.marker_detail').addClass('inverted');
                        marker_element.find('.marker_detail').css('height', height);
                        marker_element.find('.arrow-down').removeClass('arrow-down').addClass('arrow-up');
                    }

                }else if(top < 0){
                    marker_element.find('.marker_detail').addClass('inverted');
                    marker_element.find('.marker_detail').css('height', height);
                    marker_element.find('.arrow-down').removeClass('arrow-down').addClass('arrow-up');

                }
            });

            $('#' + routes[routeIndex].markers[j].jqueryId).mouseout(function() {
                var marker_element = $(this);
                marker_element.find('.marker_detail').hide();

                marker_element.find('.marker_detail').removeClass('inverted');
                marker_element.find('.marker_detail').removeClass('horizontal-inverted');
                marker_element.find('.arrow-down').removeClass('inverted');
            });
        }

        var mapOptionsRouteDetail = {
            minZoom: 13,
            maxZoom: 19,
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
        rectangle.setOptions({clickable: true});
        $('.zoom-image').show();
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
    if (!paintingRoutes) {

        showLatestPictures();

        $('#show-all-routes').hide();
        $('#influencer-picture').hide();
        $('.zoom-image').hide();

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

                if (j == 0) {

                    var marker = new RichMarker({
                        position: routeCoordinate,
                        map: map,
                        flat: true,
                        anchor: new google.maps.Size(-20, -70),
                        draggable: false,
                        routeIndex: i,
                        jqueryId: markerId,
                        content: '<div id="' + markerId + '" class="first-marker marker">' +
                            '<div class="marker_detail"><div class="arrow-down"></div><p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p></div>' +
                            '<img src="/assets/marker_azul.png"/>' +
                            '<div class="route-name">' + routes[i].name + '</div>' +
                            '</div>'
                    });

                    google.maps.event.addListener(marker, 'ready', function() {
                        $('#' + this.jqueryId).hide();
                        $('#' + this.jqueryId).toggle( 'drop', { direction: 'up' } );

                        $('#' + this.jqueryId).mouseover(function(){
                            var marker_element = $(this);
                            marker_element.find('.route-name').show();
                            marker_element.parent().parent().css('z-index', 1000);
                        });

                        $('#' + this.jqueryId).mouseout(function() {
                            var marker_element = $(this);
                            marker_element.find('.route-name').hide();
                            marker_element.parent().parent().css('z-index','auto');
                        });
                    });
                } else {

                    var marker = new RichMarker({
                        position: routeCoordinate,
                        map: null,
                        flat: true,
                        anchor: new google.maps.Size(-8, -8),
                        draggable: false,
                        routeIndex: i,
                        jqueryId: markerId,
                        content: '<div id="' + markerId + '" class="secondary-marker marker">' +
                            '<div class="marker_detail"><div class="arrow-down"></div><p>' + routes[i].locations[j].name + '</p><p>' + routes[i].locations[j].description + '</p></div>' +
                            '<img src="/assets/cuadrito_gris.png"/>' +
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

                routes[i].markers[j] = marker;
            }
        }

        map.setOptions(mapOptions);
        map.setZoom(13);
        map.setCenter(mapCenter);
        rectangle.setOptions({clickable: false});

    }
}

function showRouteDetail(routeIndex){
    if (!paintingRoutes) {

        stopLatestPictures();
        $('#influencer-video').hide();

        var markers = routes[routeIndex].markers;
        var bounds = new google.maps.LatLngBounds();
        for(i=0;i<markers.length;i++) {
            bounds.extend(markers[i].getPosition());
        }

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
        $('#influencer-picture').fadeIn(1000);

    }
}

function updatePictureDetails(post) {
    var latitude = post.lat;
    var longitude = post.long;

    var latLng = new google.maps.LatLng(latitude, longitude);

    var streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanoramaByLocation(latLng, 100, function (data, status) {

        if (status == google.maps.StreetViewStatus.OK) {
            var panoOptions = {
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

            pano.setPano(data.location.pano);
            pano.setVisible(true);

            panoInterval = window.setInterval(function() {
                try {
                    var pov = pano.getPov();
                    pov.heading += 0.1;
                    pano.setPov(pov);
                } catch(e) {
                    clearInterval(panoInterval);
                }
            }, 10);

        } else {

            var panoOptions = {
                position: new google.maps.LatLng(20.676899, -103.33893999999998),
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
                try {
                    var pov = pano.getPov();
                    pov.heading += 0.1;
                    pano.setPov(pov);
                } catch(e) {
                    clearInterval(panoInterval);
                }
            }, 10);

        }
    });

    $('#picture-gallery .post-author').html('@' + post.author_nickname);
    $('#picture-gallery p').html(post.caption);
    $('#marker-picture').attr('src', "");
    $('#marker-picture').attr('src', post.url_normal);
    $('#current-picture-id').val(post.id);

    if (user) {
        $('#picture-gallery .post-like').css('visibility','visible');
        if (hasLiked(post.instagram_id)) {
            $('#picture-gallery .post-like').html("<span title='Me gusta' class='icon liked icon-uniE60A'></span>");
        } else {
            $('#picture-gallery .post-like').html("<a title='Me gusta' onclick='likePhoto(" + post.id + ")'><span class='icon unliked icon-uniE60A'></span></a>");
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
            $('#picture-gallery .post-like').html("<span title='Me gusta' class='icon liked icon-uniE60A'></span>");
            user.likes.push(response.instagram_id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function userLikePhoto(id) {
    $.ajax({
        beforeSend: function( xhr ) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        },
        type: "POST",
        url: "/photos/" + id + "/like",
        success: function(response) {
            $('#user-picture-gallery .post-like').html("<span title='Me gusta' class='icon liked icon-uniE60A'></span>");
            user.likes.push(response.instagram_id);
        },
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function showPictureGallery() {
    if (galleryPictures.length) {
        $('#overlay').show();
        $('#picture-gallery-container').show();

        updatePictureDetails(galleryPictures[0]);
    }
}

function hidePictureGallery() {
    $('#overlay').hide();
    $('#picture-gallery-container').hide();

    clearInterval(panoInterval);
    pano = null;
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
    $("#influencer-video").attr('src','');
    $('#influencer-container').hide();
}

function influencerGalleryClick(e) {
    if (!$(e.target).closest('#influencer-gallery').get(0)) {
        hideInfluencerGallery();
    }
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
                if (user && !user.email) {
                    showMailModal();
                }
                if(!$('#user-div').css(':visible')){
                    $('#user-div').show('fast');
                    showDashboard();
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus == 'parsererror') {
                window.location = '/relocated';
            }
        }
    });
}

function logout() {
    window.location.replace("/logout");
}

function userPictureGalleryClick(e) {
    if (!$(e.target).closest('#user-picture-gallery').get(0)) {
        hideUserPictureGallery();
    }
}

function hideUserPictureGallery() {
    $('#overlay').hide();
    $('#user-picture-gallery-container').hide();

    clearInterval(userPanoInterval);
    userPano = null;
}

function showUserPictures(){
	if (user.photos.length > 0){
        $('#overlay').show();
        $('#user-picture-gallery-container').show();

        userUpdatePictureDetails(user.photos[0]);
	}else{
        showInstragramModal();
    }
}

function userUpdatePictureDetails(post) {

    var latitude = post.lat;
    var longitude = post.long;

    var latLng = new google.maps.LatLng(latitude, longitude);

    var streetViewService = new google.maps.StreetViewService();

    streetViewService.getPanoramaByLocation(latLng, 100, function (data, status) {

        if (status == google.maps.StreetViewStatus.OK) {
            var panoOptions = {
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

            userPano = new google.maps.StreetViewPanorama(
                document.getElementById('user-panorama'),
                panoOptions);

            userPano.setPano(data.location.pano);
            userPano.setVisible(true);

            userPanoInterval = window.setInterval(function() {
                try {
                    var pov = userPano.getPov();
                    pov.heading += 0.1;
                    userPano.setPov(pov);
                } catch(e) {
                    clearInterval(userPanoInterval);
                }
            }, 10);


        } else {

            var panoOptions = {
                position: new google.maps.LatLng(20.676899, -103.33893999999998),
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

            userPano = new google.maps.StreetViewPanorama(
                document.getElementById('user-panorama'),
                panoOptions);

            userPanoInterval = window.setInterval(function() {
                try {
                    var pov = userPano.getPov();
                    pov.heading += 0.1;
                    userPano.setPov(pov);
                } catch(e) {
                    clearInterval(userPanoInterval);
                }
            }, 10);

        }
    });

    $('#user-picture-gallery .post-author').html('@' + post.author_nickname);
    $('#user-picture-gallery p').html(post.caption);
    $('#user-marker-picture').attr('src', "");
    $('#user-marker-picture').attr('src', post.url_normal);
    $('#user-current-picture-id').val(post.id);

    if (user) {
        $('#user-picture-gallery .post-like').css("display", "block");
        if (hasLiked(post.instagram_id)) {
            $('#user-picture-gallery .post-like').html("<span>Ya te gusta esta foto</span>");
        }
        else {
            $('#user-picture-gallery .post-like').html("<a href='#' onclick='userLikePhoto(" + post.id + ")'>Me gusta</a>");
        }
    }
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

    userUpdatePictureDetails(user.photos[nextIndex]);
}

function showDashboard() {
    $("#login-btn").css("display", "none");
    $("#dashboard").css("display", "block");
    $("#dashboard img").attr("src", user.picture);
    $("#user-name").text(user.nickname);
    $("#user-points").text(user.points);
    $("#user-photos").text(user.photos.length);
    $("#user-invites").text(user.invites);

    $("#user-photos").click(function(){
        showUserPictures();
    });
}

function showInviteModal(){
    var tweet = 'Únete al movimiento';
    var inviteURL = 'http%3A%2F%2Fgdlestradicional.mx%3Finvite%3D' + user.uid;  //'http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIn_Watermelon_Sugar';
    var intent = 'https://twitter.com/intent/tweet?text=' + tweet + '&hashtags=GDLESTRADICIONAL&url='+ inviteURL;
    $('#invites').fadeIn(500);
    $(".share-buttons .tw").attr('href', intent);
}

function hideInviteModal(){
    $('#invites').fadeOut(500);
}

function hideInstragramModal(){
    $('#instragram-invite').fadeOut(500);
}

function showInstragramModal(){
    $('#instragram-invite').fadeIn(500);
}

function showMailModal(){
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

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
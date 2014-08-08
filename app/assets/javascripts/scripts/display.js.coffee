# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

@LAT = 20.666735
@LON = -103.350335

$(document).on 'ready', init

init = ()->

  mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(LAT,LON),
    minZoom: 16,
    maxZoom: 16,
    disableDefaultUI: true
    draggable: false
  }

  try
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    google.maps.event.addListener(map, 'bounds_changed', ()->
      bounds = map.getBounds()
      ne = bounds.getNorthEast()
      sw = bounds.getSouthWest()

      rectangle = new google.maps.Rectangle({
        strokeColor: '#11384C',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#13435B',
        fillOpacity: 0.8,
        map: map,
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(ne.lat(), sw.lng()),
          new google.maps.LatLng(sw.lat(), ne.lng())
        )
      });

      myLatlng = new google.maps.LatLng(20.666735, -103.350335)

      marker = new google.maps.Marker({
        position: myLatlng,
        optimized: false,
        title: 'Prueba',
        html: '<p>Prueba</p>'
        map: map,
      })

      infowindow = new google.maps.InfoWindow({
        content: "",
        maxWidth: 150
      })

      google.maps.event.addListener(marker, 'click', ()->
        infowindow.setContent(this.html);
        infowindow.open(map,marker);
      );
    )
  catch e
    console.log e


init()



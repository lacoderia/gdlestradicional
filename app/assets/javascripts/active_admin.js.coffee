#= require active_admin/base

@activatePhotos = (photo_id, activate) ->
	$.ajax "/photos/#{photo_id}/activate?activate=#{activate}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#photo_link_#{photo_id}").attr('onclick', "activatePhotos(#{photo_id}, #{!activate})")

@especialLocation = (location_id, especial) ->
	$.ajax "/locations/#{location_id}/especial?especial=#{especial}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#location_link_#{location_id}").attr('onclick', "especialLocation(#{location_id}, #{!especial})")

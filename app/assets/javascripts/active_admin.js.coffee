#= require active_admin/base

@activatePhotos = (photo_id, activate) ->
	$.ajax "/photos/#{photo_id}/activate?activate=#{activate}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#photo_link_#{photo_id}").attr('onclick', "activatePhotos(#{photo_id}, #{!activate})")
			$("#photo_link_#{photo_id}").text("#{if activate then 'desactivar' else 'activar'}")

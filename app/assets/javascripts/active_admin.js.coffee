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

@activateCuervoPhotos = (location_id, activate) ->
	$.ajax "/cuervo_photos/#{location_id}/activate?activate=#{activate}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#photo_link_#{location_id}").attr('onclick', "activateCuervoPhotos(#{location_id}, #{!activate})")

@activateTweets = (tweet_id, activate) ->
	$.ajax "/tweets/#{tweet_id}/activate?activate=#{activate}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#tweet_link_#{tweet_id}").attr('onclick', "activateTweets(#{tweet_id}, #{!activate})")

@especialInfluencer = (influencer_id, especial) ->
	$.ajax "/influencers/#{influencer_id}/especial?especial=#{especial}",
		type: 'POST'
		dataType: 'html'
		error: (jqXHR, textStatus, errorThrown) ->
			alert('Error. Intenta de nuevo.')
		success: (data, textStatus, jqXHR) ->
			$("#influencer_link_#{influencer_id}").attr('onclick', "especialInfluencer(#{influencer_id}, #{!especial})")


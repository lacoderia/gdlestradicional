json.array!(@routes) do |route|
  json.extract! route, :id, :name, :description
  json.locations route.locations.where('active = ?', true).order('locations_routes.id ASC') do |location|
		json.extract! location, :id, :name, :description, :lat, :long, :especial
		last = location.photos.where('active = ?', true).last
		json.recent_photo (last ? last.url_thumb : "")
	end
	json.set! :influencer do 
		json.extract! route.influencer, :id, :name, :description, :is_especial, :video_url
	end
end

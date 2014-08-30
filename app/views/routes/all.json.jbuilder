json.array!(@routes) do |route|
  json.extract! route, :id, :name, :description
  json.locations route.locations do |location|
		json.extract! location, :id, :name, :description, :lat, :long
		last = location.photos.where('active = ?', true).last
		json.recent_photo (last ? last.url_thumb : "")
	end
end

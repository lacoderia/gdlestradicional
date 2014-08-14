json.array!(@routes) do |route|
  json.extract! route, :id, :name, :description
  json.locations route.locations do |location|
		json.extract! location, :id, :name, :description, :lat, :long
		json.recent_photo location.photos.last.url_thumb
	end
end

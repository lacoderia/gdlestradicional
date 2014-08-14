json.array!(@photos) do |photo|
  json.extract! photo, :id, :instagram_id, :caption, :author_id, :author_nickname, :lat, :long, :location_id, :url_low, :url_thumb, :url_normal, :points, :active
  json.url photo_url(photo, format: :json)
end

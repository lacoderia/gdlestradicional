json.array!(@photos) do |photo|
  json.extract! photo, :id, :instagram_id, :location_id, :lat, :long, :caption, :author_nickname, :url_low, :url_thumb, :url_normal, :points
end
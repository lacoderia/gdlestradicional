json.array!(@photos) do |photo|
  json.extract! photo, :id, :instagram_id, :caption, :author_nickname, :url_low, :url_thumb, :url_normal, :points
end
json.array!(@photos) do |photo|
  json.extract! photo, :id, :author_nickname, :url_low, :url_thumb
end

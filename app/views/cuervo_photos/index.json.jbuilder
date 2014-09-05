json.array!(@cuervo_photos) do |cuervo_photo|
  json.extract! cuervo_photo, :id, :gallery_id, :name, :description, :active
  json.url cuervo_photo_url(cuervo_photo, format: :json)
end

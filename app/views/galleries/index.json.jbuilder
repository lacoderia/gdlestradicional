json.array!(@galleries) do |gallery|
  json.extract! gallery, :id, :name
  json.photos gallery.cuervo_photos.where('active = ?', true) do |photo|
		json.id photo.id
		json.name gallery.name
		json.thumb photo.avatar.url(:medium)
		json.original photo.avatar.url
	end
end

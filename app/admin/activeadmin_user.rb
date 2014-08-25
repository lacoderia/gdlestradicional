ActiveAdmin.register User do

  permit_params :active

	show do |user|
		attributes_table do
    	row :uid
    	row :nickname
			table_for user.photos do
				column "Photo", :url_thumb do |photo|
					link_to( (image_tag photo.url_thumb), photo.url_normal, :target => "_blank" )
				end
				column "", :editar do |photo|
					link_to( "Editar", edit_admin_photo_path(photo) )
				end
			end
		end
	end	

end

ActiveAdmin.register User do

	actions :all, :except => [:new, :edit, :destroy] 

  permit_params :active

	controller do
		def update
	    update! do |format|
  	    format.html { redirect_to admin_users_path }
    	end
	  end
  end

	index do
		column :uid
		column :name
		column :nickname
		column :email
		column "" do |user|
				link_to "View", admin_user_path(user)
		end
		#column "" do |user|
		#		link_to "Edit", edit_admin_user_path(user)
		#end
	end

	form do |f|
		f.inputs "User details" do
			f.input :uid, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
			f.input :name, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
			f.input :nickname, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
			f.input :email, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
			f.input :active
		end
		f.actions
	end

	show do |user|
		attributes_table do
    	row :uid
    	row :nickname
			table_for user.photos do 
				column "Photo", :url_thumb, :class => "photo_alignment" do |photo|
					link_to( (image_tag photo.url_thumb), photo.url_normal, :target => "_blank" )
				end
				column :location, :class => "photo_alignment"
				column :caption, :class => "photo_alignment"
				column :points, :class => "photo_alignment"
				column :active, :class => "photo_alignment" do |photo|
					if photo.active
						check_box_tag "photo_link_#{photo.id}", "active", true, :onclick => "activatePhotos(#{photo.id}, false)"
					else
						check_box_tag "photo_link_#{photo.id}", "active", false, :onclick => "activatePhotos(#{photo.id}, true)" 
					end
				end
				column :created_at, :class => "photo_alignment"
				column "", :editar, :class => "photo_alignment" do |photo|
					link_to( "Editar", edit_admin_photo_path(photo) )
				end
			end
		end
	end	

end

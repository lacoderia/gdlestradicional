ActiveAdmin.register Photo do

  permit_params :points, :active, :location_id

	controller do
    def scoped_collection
      resource_class.includes(:location) 
    end
		def update
	    update! do |format|
  	    format.html { redirect_to admin_photos_path }
    	end
	  end
  end

	index do
    column :caption
    column :author_nickname, :sortable => :author_nickname do |photo|
			user = User.find_by_uid(photo.author_id)
			if user
				link_to photo.author_nickname, admin_user_path(user)
			else
				photo.author_nickname
			end
		end
    column :location_id, :sortable => 'locations.name' do |photo|
			photo.location.name
		end
    column :url_thumb do |photo|
			link_to( (image_tag photo.url_thumb), photo.url_normal, :target=>"_blank")
		end
    column :points
    column :active
    column :created_at
		actions :defaults => false do |photo|
      link_to "Edit", edit_admin_photo_path(photo)
    end
  end

	form do |f|
		f.inputs "Photo details" do
			f.input :caption, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
			f.input :author_nickname, :as => :string, :input_html => { :disabled => true, :style => "background-color: #d3d3d3;" }
			f.input :location
			f.input	:points
			f.input :active
		end
    f.actions
	end

  filter :location
	filter :active, :as => :select

end

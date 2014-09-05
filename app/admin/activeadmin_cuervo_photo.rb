ActiveAdmin.register CuervoPhoto do

	actions :all

	permit_params :gallery_id, :description, :name, :avatar, :active

	controller do
    def scoped_collection
      resource_class.includes(:gallery) 
    end
  end

	index do
		column :name, :class => "photo_alignment"
		column :description, :class => "photo_alignment"
		column :gallery_id, :sortable => 'galleries.name' do |photo|
			photo.gallery.name if photo.gallery
		end
		column :avatar, :class => "photo_alignment" do |photo|
			link_to( (image_tag photo.avatar.url(:thumb)), photo.avatar.url(:original), :target=>"_blank" )
		end
		column :active, :class => "photo_alignment" do |photo|
			if photo.active
				check_box_tag "photo_link_#{photo.id}", "active", true, :onclick => "activateCuervoPhotos(#{photo.id}, false)"
			else
				check_box_tag "photo_link_#{photo.id}", "active", false, :onclick => "activateCuervoPhotos(#{photo.id}, true)" 
			end
		end
		actions :defaults => true
	end

	form do |f|
		f.inputs "Project Details" do
			f.input :name
			f.input :description
			f.input :gallery
			f.input :active
			f.input :avatar, :required => false, :as => :file
			# Will preview the image when the object is edited
		end
		f.actions
	end

	show do |ad|
		attributes_table do
			row :name
			row :description
			row :gallery
			row :active
			row :avatar do |photo|
				link_to( (image_tag photo.avatar.url(:thumb)), photo.avatar.url(:original), :target=>"_blank" )
			end
			# Will display the image on show object page
		end
	end

	filter :gallery
	filter :active, :as => :select
end

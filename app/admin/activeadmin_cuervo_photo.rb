ActiveAdmin.register CuervoPhoto do

permit_params :gallery_id, :description, :name, :avatar, :active

	form do |f|
		f.inputs "Project Details" do
			f.input :name
			f.input :avatar, :required => false, :as => :file
			# Will preview the image when the object is edited
		end
		f.actions
	end

	show do |ad|
		attributes_table do
			row :name
			row :avatar do
				image_tag(ad.avatar.url(:thumb))
			end
			# Will display the image on show object page
		end
	end
end

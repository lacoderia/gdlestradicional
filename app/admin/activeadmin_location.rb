ActiveAdmin.register Location do
  
	actions :all, :except => [:new, :destroy]

  permit_params :especial, :active, :name, :description, :lat, :long, :route_ids => []

	controller do
		def update
	    update! do |format|
  	    format.html { redirect_to admin_locations_path }
    	end
	  end
  end

	form do |f|
		f.inputs "Location Details" do
			f.input :name
			f.input :especial
			f.input :description
			#f.input :routes, :collection => Route.all, :as => :check_boxes
		end
		f.actions
	end	

	index do
		column :name
		column :description
		column :especial do |location|
			if location.especial
				check_box_tag "location_link_#{location.id}", "active", true, :onclick => "especialLocation(#{location.id}, false)"
			else
				check_box_tag "location_link_#{location.id}", "active", false, :onclick => "especialLocation(#{location.id}, true)" 
			end
		end
		column :routes do |location|
	   location.routes.map { |route| route.name }.join("<br/>").html_safe
  	end
		actions :defaults => false do |location|
      link_to "Edit", edit_admin_location_path(location)
    end
		
	end

end

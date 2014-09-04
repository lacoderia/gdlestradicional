ActiveAdmin.register Location do
  
	actions :all, :except => [:new, :destroy]

  permit_params :especial, :active, :name, :description, :lat, :long, :route_id

	controller do
		def update
	    update! do |format|
  	    format.html { redirect_to admin_locations_path }
    	end
	  end
  end

	index do
		column :name
		column :description
		column :route_id do |location|
			location.route.name if location.route
		end
		column :especial do |location|
			if location.especial
				check_box_tag "location_link_#{location.id}", "active", true, :onclick => "especialLocation(#{location.id}, false)"
			else
				check_box_tag "location_link_#{location.id}", "active", false, :onclick => "especialLocation(#{location.id}, true)" 
			end
		end
		actions :defaults => false do |location|
      link_to "Edit", edit_admin_location_path(location)
    end
		
	end

end

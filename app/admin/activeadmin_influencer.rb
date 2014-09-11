ActiveAdmin.register Influencer do

	actions :all, :except => [:new, :destroy]

	permit_params :name, :description, :is_especial, :video_url

	controller do
		def update
	    update! do |format|
  	    format.html { redirect_to admin_influencers_path }
    	end
	  end
  end

	form do |f|
		f.inputs "Influencer Details" do
			f.input :name
			f.input :description
			f.input :is_especial
			f.input :video_url
		end
		f.actions
	end

	index do
	
		column :name
		column :description
		column :video_url
		column :is_especial do |influencer|
			if influencer.is_especial
				check_box_tag "influencer_link_#{influencer.id}", "active", true, :onclick => "especialInfluencer(#{influencer.id}, false)"
			else
				check_box_tag "influencer_link_#{influencer.id}", "active", false, :onclick => "especialInfluencer(#{influencer.id}, true)" 
			end
		end
		column "" do |influencer|
				link_to "Edit", edit_admin_influencer_path(influencer)
		end
	end

end

ActiveAdmin.register Tweet do

	actions :all

	permit_params :author, :text, :active

	index do

		column :author
		column :text
		column :active do |tweet|
			if tweet.active
				check_box_tag "tweet_link_#{tweet.id}", "active", true, :onclick => "activateTweets(#{tweet.id}, false)"
			else
				check_box_tag "tweet_link_#{tweet.id}", "active", false, :onclick => "activateTweets(#{tweet.id}, true)" 
			end
		end
		actions :defaults => true
	end

	form do |f|
		f.inputs "" do
			f.input :author
			f.input :text
			f.input :active
		end
		f.actions
	end

	show do |tweet|
		attributes_table do
			row :author
			row :text
			row :active
		end
	end

end

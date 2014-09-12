class TweetsController < ApplicationController
	
	load_and_authorize_resource

	def activate

		tweet = Tweet.find(params[:id])
		if tweet 
			tweet.update_attribute(:active, params[:activate])
      render json: {:tweet => tweet}
      return
		else
    	render plain: "Error", status: 401
		end
	end

end

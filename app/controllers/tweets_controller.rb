class TweetsController < ApplicationController

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

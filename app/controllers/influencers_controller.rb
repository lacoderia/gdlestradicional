class InfluencersController < ApplicationController
	
	load_and_authorize_resource

	def especial

		influencer = Influencer.find(params[:id])
		if influencer
			influencer.update_attribute(:is_especial, params[:especial])
      render json: {:influencer => influencer}
      return
		else
    	render plain: "Error", status: 401
		end
	end
	
end

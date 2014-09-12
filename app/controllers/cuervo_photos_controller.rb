class CuervoPhotosController < ApplicationController
	
	load_and_authorize_resource

	def activate

		photo = CuervoPhoto.find(params[:id])
		if photo
			photo.update_attribute(:active, params[:activate])
      render json: {:cuervo_photo => photo}
      return
		else
    	render plain: "Error", status: 401
		end
	end

end

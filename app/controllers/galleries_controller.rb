class GalleriesController < ApplicationController
	
	load_and_authorize_resource

	def index
    @galleries = Gallery.all
  end

end

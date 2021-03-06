class PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :edit, :update, :destroy]
	
	load_and_authorize_resource

  # GET /photos
  # GET /photos.json
  def index
    @photos = Photo.all
  end

  # GET /photos/1
  # GET /photos/1.json
  def show
  end

  # GET /photos/new
  def new
    @photo = Photo.new
  end

  # GET /photos/1/edit
  def edit
  end

  # POST /photos
  # POST /photos.json
  def create
    @photo = Photo.new(photo_params)

    respond_to do |format|
      if @photo.save
        format.html { redirect_to @photo, notice: 'Photo was successfully created.' }
        format.json { render :show, status: :created, location: @photo }
      else
        format.html { render :new }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /photos/1
  # PATCH/PUT /photos/1.json
  def update
    respond_to do |format|
      if @photo.update(photo_params)
        format.html { redirect_to @photo, notice: 'Photo was successfully updated.' }
        format.json { render :show, status: :ok, location: @photo }
      else
        format.html { render :edit }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    @photo.destroy
    respond_to do |format|
      format.html { redirect_to photos_url, notice: 'Photo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def recent
    @photos = Photo.where('active = ?', true).last(10)
  end

  def like
    if (current_user)
      photo = Photo.find(params[:id])
      client = Instagram.client
      client.access_token = current_user.access_token
      client.like_media(photo.instagram_id)
      render json: {:instagram_id => photo.instagram_id}
      return
    end
    render plain: "Error", status: 401
  end

	def activate

		photo = Photo.find(params[:id])
		if photo
			photo.update_attribute(:active, params[:activate])
      render json: {:photo => photo}
      return
		else
    	render plain: "Error", status: 401
		end
	end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def photo_params
      params.require(:photo).permit(:instagram_id, :caption, :author_id, :author_nickname, :tags, :lat, :long, :location_id, :url_low, :url_thumb, :url_normal, :points, :active)
    end
end

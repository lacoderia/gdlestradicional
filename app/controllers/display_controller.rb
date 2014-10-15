class DisplayController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:instagram_push]
  
	authorize_resource :class => false

  def home
    render :layout => 'home'
  end

  def index
    @illumination = Illumination.first
    @user = current_user.get_info if current_user
    ip = request.remote_ip
    invite = params[:invite]
    if invite && @user
      @user.add_invite(ip) if @user[:uid] != invite
    elsif invite
      user = User.find_by_uid(invite)
      user.add_invite(ip) if user
    end
    if params[:fotos]
      @galeria = true
    end 
  end

  def mobile
    @illumination = Illumination.first
    @user = current_user.get_info if current_user
    ip = request.remote_ip
    invite = params[:invite]
    if invite && @user
      @user.add_invite(ip) if @user[:uid] != invite
    elsif invite
      user = User.find_by_uid(invite)
      user.add_invite(ip) if user
    end
    if params[:fotos]
      @galeria = true
    end 
    render :layout => 'mobile'
  end

  def instagram_push
  	logger.info 'params Instagram'
  	logger.info params
  	if params['hub.challenge']
  		render plain: params['hub.challenge']
      return
  	else
      Thread.new do
        fetch_new_photos
      end
  	end
    render plain: 'ok'
  end

  def fetch_new_photos
    instagram = Instagram.client
    util = Util.last
    next_min_id = util.next_min_id
    results = instagram.tag_recent_media('gdlestradicional', {:min_tag_id => next_min_id})
    if results.size > 0
      results.each do |object|
        if object.location && object.type == 'image'
          begin
            new_photo = Photo.create(instagram_id: object.id, caption: object.caption.text, author_id: object.user.id, author_nickname: object.user.username, lat: object.location.latitude, long: object.location.longitude, url_low: object.images.low_resolution.url, url_thumb: object.images.thumbnail.url, url_normal: object.images.standard_resolution.url)
            WebsocketRails[:twitter_channel].trigger(:new_picture, new_photo.to_json)
          rescue
            logger.info "INSTAGRAM:DUPLICADO"
          end
        end  
      end
      util.update_attribute(:next_min_id, results.pagination.min_tag_id)
    end
  end

  def relocated
    session[:redirect] = true
    redirect_to '/users/auth/instagram'
  end

  def get_illumination
    @tweets = Tweet.where('featured = ?', false)
  end


	# Falta incluir logica para prender y apagar el mapa
	def self.illuminate_map activate
    il = Illumination.last
    il.update_attribute(:active, activate)
		if activate == true
			logger.info "Activar"
		else
			logger.info "Desactivar"
      Tweet.where('featured = ?', false).destroy_all
		end
    WebsocketRails[:twitter_channel].trigger(:map_status, activate)
	end

end

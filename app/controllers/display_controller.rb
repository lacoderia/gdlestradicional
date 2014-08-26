class DisplayController < ApplicationController

  def home
    render :layout => 'home'
  end

  def index

  end

  def mobile
    render :layout => 'mobile'
  end

  def instagram_push
  	puts 'diego'
  	puts params
  	if params['hub.challenge']
  		puts 'challenge ' + params['hub.challenge']
  		render plain: params['hub.challenge']
      return
  	else
  	  #Instagram.process_subscription(params[:body]) do |handler|
        puts '------------------------diego'
        #puts handler.to_yaml
        #Thread.new do
          fetch_new_photos
        #end
        puts 'diego------------------------'
  	  #end
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
        if object.location
          Photo.create(instagram_id: object.id, caption: object.caption.text, author_id: object.user.id, author_nickname: object.user.username, lat: object.location.latitude, long: object.location.longitude, url_low: object.images.low_resolution.url, url_thumb: object.images.thumbnail.url, url_normal: object.images.standard_resolution.url, points: 2)
        end  
      end
      util.update_attribute(:next_min_id, results.pagination.min_tag_id)
    end
  end

end

class DisplayController < ApplicationController

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
        puts '------------------------'
        #puts handler.to_yaml
        #Thread.new do
          fetch_new_photos
        #end
        puts '------------------------'
  	  #end
  	end
    render plain: 'ok'
  end

  def test_twitter
    client = Twitter::Streaming::Client.new do |config|
      config.consumer_key    = ENV['CONSUMER_TOKEN']
      config.consumer_secret = ENV['CONSUMER_SECRET']
      config.access_token    = ENV['ACCESS_TOKEN']
      config.access_token_secret   = ENV['ACCESS_SECRET']
    end

    test = {:name => 'Diego', :time => Time.now.to_i}
    WebsocketRails[:twitter_channel].trigger(:new_tweet, test.to_json)
    #client.filter(:track => 'foodporn') do |object|
    #  puts object.text if object.is_a?(Twitter::Tweet)
    #end
		render plain: 'ok'
  end

  def fetch_new_photos
    instagram = Instagram.client
    results = instagram.tag_recent_media('gdlestradicional', {:min_tag_id => $next_min_id})
    if results.size > 0
      $next_min_id = results.pagination.min_tag_id
      results.each do |object|
        puts '---------------'
        puts object.id
        puts object.caption
        puts '---------------'
      end
    end
  end

end

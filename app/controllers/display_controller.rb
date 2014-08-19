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
  	else
  		Instagram.process_subscription(params[:body]) do |handler|
  		end
  	end
  end

  def test_twitter
    client = Twitter::Streaming::Client.new do |config|
      config.consumer_key    = ENV['CONSUMER_TOKEN']
      config.consumer_secret = ENV['CONSUMER_SECRET']
      config.access_token    = ENV['ACCESS_TOKEN']
      config.access_token_secret   = ENV['ACCESS_SECRET']
    end

    client.filter(:track => 'LuisitoRadio') do |object|
      puts object.text if object.is_a?(Twitter::Tweet)
    end
  end

end

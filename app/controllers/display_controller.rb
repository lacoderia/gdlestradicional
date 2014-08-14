class DisplayController < ApplicationController

  def index

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

end

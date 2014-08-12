class DisplayController < ApplicationController

  def index

  end

  def new_photo
  	puts 'diego'
  	puts params
  	if params['hub.challenge']
  		puts 'challenge ' + params['hub.challenge']
  		render plain: params['hub.challenge']
  		return
  	end
  	render plain: 'Ok'
  end

end

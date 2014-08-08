class DisplayController < ApplicationController

  def index

  end

  def new_photo
  	puts 'diego'
  	puts params
  	if params['hub.challenge']
  		puts 'challenge ' + params['hub.challenge']
  end

end

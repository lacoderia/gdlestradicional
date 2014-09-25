#!/usr/bin/env ruby
ENV["RAILS_ENV"] = "production"

require File.dirname(__FILE__) + "/../config/environment"

client = Twitter::Streaming::Client.new do |config|
  config.consumer_key    = ENV['CONSUMER_TOKEN']
  config.consumer_secret = ENV['CONSUMER_SECRET']
  config.access_token    = ENV['ACCESS_TOKEN']
  config.access_token_secret   = ENV['ACCESS_SECRET']
end

positions = [
  {:lat => 20.657489, :long => -103.367085}, {:lat => 20.662549, :long => -103.337988}, {:lat => 20.671865, :long => -103.341593},
  {:lat => 20.681662, :long => -103.363222}, {:lat => 20.661264, :long => -103.369574}, {:lat => 20.647129, :long => -103.356699},
  {:lat => 20.662388, :long => -103.361162}, {:lat => 20.652751, :long => -103.332495}, {:lat => 20.663191, :long => -103.344511},
  {:lat => 20.661746, :long => -103.354639}, {:lat => 20.668974, :long => -103.372149}, {:lat => 20.693706, :long => -103.420643}, 
  {:lat => 20.680939, :long => -103.372149}, {:lat => 20.648414, :long => -103.392834}, {:lat => 20.676562, :long => -103.346571}
]

begin
  client.filter(:track => 'gdlestradicional') do |object|
  #client.filter(:locations => "-103.477892,20.615802,-103.257822,20.692261") do |object|
  	if object.is_a?(Twitter::Tweet)
      tweet = Tweet.new(:featured => false, :author => object.attrs[:user][:screen_name], :text => object.text)
      if object.attrs[:geo]
        tweet.lat = object.attrs[:geo][:coordinates][0]
        tweet.long = object.attrs[:geo][:coordinates][1]
      else
        random = rand(0..14)
        tweet.lat = positions[random][:lat]
        tweet.long = positions[random][:long]
      end
      tweet.save
      WebsocketRails[:twitter_channel].trigger(:new_tweet, tweet)
    end
  end
rescue => e
  retry
end

#!/usr/bin/env ruby
ENV["RAILS_ENV"] = "development"

#root = File.expand_path(File.join(File.dirname(__FILE__), '../..'))
#require File.join(root, "config", "environments", ENV["RAILS_ENV"])
require File.dirname(__FILE__) + "/../config/environment"

client = Twitter::Streaming::Client.new do |config|
  config.consumer_key    = ENV['CONSUMER_TOKEN']
  config.consumer_secret = ENV['CONSUMER_SECRET']
  config.access_token    = ENV['ACCESS_TOKEN']
  config.access_token_secret   = ENV['ACCESS_SECRET']
end

client.filter(:track => 'love') do |object|
	if object.is_a?(Twitter::Tweet) && object.attrs[:geo]
    puts '-----------------------'
		puts 'id : ' + object.attrs[:id].to_s
    puts 'tweet: ' + object.text
    puts object.attrs[:geo]
		puts object.attrs[:coordinates]
    WebsocketRails[:twitter_channel].trigger(:new_tweet, object.attrs[:geo][:coordinates])
  end
end

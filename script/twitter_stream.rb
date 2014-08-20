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

client.filter(:track => 'foodporn') do |object|
	puts object.text if object.is_a?(Twitter::Tweet)
end
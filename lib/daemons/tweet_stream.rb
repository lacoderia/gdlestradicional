require ENV["RAILS_ENV_PATH"]

client = Twitter::Streaming::Client.new do |config|
  config.consumer_key    = ENV['CONSUMER_TOKEN']
  config.consumer_secret = ENV['CONSUMER_SECRET']
  config.access_token    = ENV['ACCESS_TOKEN']
  config.access_token_secret   = ENV['ACCESS_SECRET']
end

client.filter(:track => 'foodporn') do |object|
	puts object.text if object.is_a?(Twitter::Tweet)
end
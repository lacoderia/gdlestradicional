require "instagram"

$next_min_id = ''
Instagram.configure do |config|
	config.client_id = ENV['INSTAGRAM_ID']
  config.client_secret = ENV['INSTAGRAM_SECRET']
end
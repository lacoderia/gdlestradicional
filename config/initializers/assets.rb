# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'


# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( lib/richmarker.js )
Rails.application.config.assets.precompile += %w( scripts/display.js )
Rails.application.config.assets.precompile += %w( scripts/mobile.js )
Rails.application.config.assets.precompile += %w( lib/jquery.sidr.min.js )

Rails.application.config.assets.precompile += %w( styles/home.css )
Rails.application.config.assets.precompile += %w( styles/mobile.css )
Rails.application.config.assets.precompile += %w( styles/jquery.sidr.dark.css )
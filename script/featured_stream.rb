#!/usr/bin/env ruby
ENV["RAILS_ENV"] = "production"

require File.dirname(__FILE__) + "/../config/environment"

featured = Tweet.where("featured = ? and active = ?", true, true)
positions = [
  {:lat => 20.657489, :long => -103.367085}, {:lat => 20.662549, :long => -103.337988}, {:lat => 20.671865, :long => -103.341593},
  {:lat => 20.681662, :long => -103.363222}, {:lat => 20.661264, :long => -103.369574}, {:lat => 20.647129, :long => -103.356699},
  {:lat => 20.662388, :long => -103.361162}, {:lat => 20.652751, :long => -103.332495}, {:lat => 20.663191, :long => -103.344511},
  {:lat => 20.661746, :long => -103.354639}, {:lat => 20.668974, :long => -103.372149}, {:lat => 20.693706, :long => -103.420643}, 
  {:lat => 20.680939, :long => -103.372149}, {:lat => 20.648414, :long => -103.392834}, {:lat => 20.676562, :long => -103.346571}
]

il = Illumination.first

if featured.size > 0
  random1 = rand(0..featured.size-1)
  random2 = rand(0..14)
  tweet = featured[random1]
  tweet.lat = positions[random2][:lat]
  tweet.long = positions[random2][:long]
  WebsocketRails[:twitter_channel].trigger(:new_tweet, tweet)
end

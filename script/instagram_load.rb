#!/usr/bin/env ruby
ENV["RAILS_ENV"] = "production"

require File.dirname(__FILE__) + "/../config/environment"

instagram = Instagram.client
util = Util.last
next_min_id = util.next_min_id
results = instagram.tag_recent_media('gdlestradicional', {:min_tag_id => next_min_id})
if results.size > 0
  results.each do |object|
    if object.location && object.type == 'image'
      new_photo = Photo.create(instagram_id: object.id, caption: object.caption.text, author_id: object.user.id, author_nickname: object.user.username, lat: object.location.latitude, long: object.location.longitude, url_low: object.images.low_resolution.url, url_thumb: object.images.thumbnail.url, url_normal: object.images.standard_resolution.url)
    end  
  end
  util.update_attribute(:next_min_id, results.pagination.min_tag_id)
end
class Photo < ActiveRecord::Base
	belongs_to :location
	belongs_to :user, foreign_key: 'author_id'
end

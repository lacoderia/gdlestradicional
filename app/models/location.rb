class Location < ActiveRecord::Base
	belongs_to :route
	has_many :photos
end

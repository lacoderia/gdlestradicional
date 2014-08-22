class Location < ActiveRecord::Base
	belongs_to :route
	has_many :photos

	geocoded_by :address, :latitude  => :lat, :longitude => :long
end

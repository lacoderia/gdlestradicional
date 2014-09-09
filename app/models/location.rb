class Location < ActiveRecord::Base
	has_and_belongs_to_many :routes
	has_many :photos

	geocoded_by :address, :latitude  => :lat, :longitude => :long
end

class Photo < ActiveRecord::Base
	belongs_to :location
	belongs_to :user, foreign_key: 'author_id', primary_key: 'uid' 
	
	geocoded_by :address, :latitude  => :lat, :longitude => :long

	after_create :update_location

	def closest_to
		acc_distance = nil
		closest_location = nil
		Location.all.each do |location|
			distance = self.distance_to location
			if (not acc_distance) or (distance < acc_distance)
				acc_distance = distance
				closest_location = location
			end
		end
		closest_location
	end

	def update_location
		location = self.closest_to
		self.update_attribute(:location_id, location.id) if location
	end
end

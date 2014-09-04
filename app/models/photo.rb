class Photo < ActiveRecord::Base
	belongs_to :location
	belongs_to :user, foreign_key: 'author_id', primary_key: 'uid' 
	
	geocoded_by :address, :latitude  => :lat, :longitude => :long

	after_create :update_location

	DISTANCE_GDL = 7.02 
	DISTANCE_3CUADRAS = 0.31

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
		[closest_location, acc_distance]
	end

	def update_location
		result = self.closest_to
		location = result[0]
		distance = result[1]

		if location
			if distance <= DISTANCE_3CUADRAS
				#if location.especial
				#	self.update_attributes(:location_id => location.id, :points => 5)
				#else
					self.update_attributes(:location_id => location.id, :points => 3)
				#end
			elsif distance <= DISTANCE_GDL 
				self.update_attribute(:points, 1)
			end
		end
	end
end

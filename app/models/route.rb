class Route < ActiveRecord::Base
	has_and_belongs_to_many :locations
	belongs_to :influencer
end

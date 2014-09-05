class CuervoPhoto < ActiveRecord::Base
	belongs_to :gallery

	has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }
	validates_attachment :avatar, content_type: { content_type:     ["image/jpg", "image/jpeg", "image/png"] }
	
end

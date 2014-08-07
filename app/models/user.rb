class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  
  has_and_belongs_to_many :roles

  def email_required? 
  	false
  end

  def self.find_for_instagram_oauth(auth, signed_in_resource = nil)
		user = User.where(:nickname => auth.info.nickname).first
		unless user
			# CHECK FOR NEW/CREATE
			user = User.create(name:auth.info.name, uid:auth.uid, nickname:auth.info.nickname, access_token: auth.credentials.token, picture: auth.info.image, password:Devise.friendly_token[0,20])
		end
		user
	end

	def role?(role)
		return !!self.roles.find_by_name(role)
	end

end

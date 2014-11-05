class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  
  has_and_belongs_to_many :roles
  has_many :photos, foreign_key: 'author_id', primary_key: 'uid'
  has_many :invites

  def email_required? 
  	false
  end

  def self.find_for_instagram_oauth(auth, signed_in_resource = nil)
		user = User.where(:nickname => auth.info.nickname).first
		unless user
			# CHECK FOR NEW/CREATE
			user = User.create(name:auth.info.name, uid:auth.uid, nickname:auth.info.nickname, access_token: auth.credentials.token, picture: auth.info.image, password:Devise.friendly_token[0,20])
		end
		user.update_attribute(:access_token, auth.credentials.token)
		user
	end

	def role?(role)
		return !!self.roles.find_by_name(role)
	end

	def get_info
		likes = []
		instagram = Instagram.client
		instagram.access_token = self.access_token
		instagram.user_liked_media({:count => 1000}).each do |object|
			likes.push(object.id) if object.type == 'image'
		end
		points = 0
		photos = self.photos.where("active = ?", true)
		photos.each do | photo |
			points += photo.points
		end
		num_invites = 0
		invites = self.invites
		invites.each do | invite |
			num_invites +=1
			if num_invites == 5
				points += 1
				num_invites = 0
			end
		end
		return {:id => self.id, :uid => self.uid, :email => self.email, :nickname => self.nickname, :picture => self.picture, :likes => likes, :points => points, :photos => photos, :invites => invites.size}
	end

	def add_invite(ip)
		begin
			Invite.create(user_id: self.id, ip_address: ip)
		rescue
			return
		end
	end

	def self.full_users
	  users = User.all.order(:id)
          users.each do |user|
            user.calculate_points_and_picture_count
          end
          photos = Photo.find_by_sql("SELECT * from photos p WHERE author_id NOT IN (select uid from users) ORDER BY author_id")
          temp = nil
          if photos[0]
            temp = User.find_by_nickname(photos[0].author_nickname)
            if not temp
              temp = User.new
              temp.uid = photos[0].author_id
              temp.nickname = photos[0].author_nickname 
              temp.password = "password"
              temp.access_token = "t"
            else
              temp.calculate_points_and_picture_count
            end

          end

          photos.each do | photo |
            if temp.uid != photo.author_id
              temp.save
              temp.calculate_points_and_picture_count
              #users.push(temp)
              temp = User.new
              temp.uid = photo.author_id
              temp.nickname = photo.author_nickname
              temp.password = "password"
              temp.access_token = "t"
            end
          end
          return User.all.order(:id)
      end

      def calculate_points_and_picture_count
        points = 0
        photos = self.photos.where("active = ?", true)
        photos.each do | photo |
          points += photo.points
        end

        if self.access_token.length > 1
          num_invites = 0
          invites = self.invites
          invites.each do | invite |
            num_invites +=1
            if num_invites == 5
              points += 1
              num_invites = 0
            end
          end
        end
        self.update_attribute(:points, points)
        self.update_attribute(:picture_count, self.photos.count)
      end
end

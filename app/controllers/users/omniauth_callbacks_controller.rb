class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def instagram
		puts auth_hash
		@user = User.find_for_instagram_oauth(auth_hash, current_user)
		if @user.persisted?
			sign_in @user
			#redirect_to users_path
			@success = true
			@results = []
			instagram = Instagram.client
			instagram.access_token = @user.access_token
			instagram.user_liked_media({:count => 1000}).each do |object|
				@results.push(object.id) if object.type == 'image'
			end
		else
			session["devise.instagram_data"] = auth_hash.except("extra")
			#redirect_to signup_url(@user)
			@success = false
		end
		render "login.json"
	end

	def auth_hash
		request.env["omniauth.auth"]
	end
end

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def instagram
		puts auth_hash
		@user = User.find_for_instagram_oauth(auth_hash, current_user)
		if @user.persisted?
			sign_in @user
			redirect_to users_path
		else
			session["devise.instagram_data"] = auth_hash.except("extra")
			redirect_to signup_url(@user)
		end
	end

	def auth_hash
		request.env["omniauth.auth"]
	end
end

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def instagram
		puts auth_hash
		@user = User.find_for_instagram_oauth(auth_hash, current_user)
		if @user.persisted?
			flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Instagram"
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

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	protect_from_forgery except: :instagram

	def instagram
		puts auth_hash
		user = User.find_for_instagram_oauth(auth_hash, current_user)
		if user.persisted?
			sign_in user
			success = true
			user_info = user.get_info
			response = {:success => success, :user => user_info}
		else
			session["devise.instagram_data"] = auth_hash.except("extra")
			success = false
			response = {:success => success}
		end
		#render "login.json"
		render :json => response.to_json, :callback => 'callbackName'
	end

	def auth_hash
		request.env["omniauth.auth"]
	end
end

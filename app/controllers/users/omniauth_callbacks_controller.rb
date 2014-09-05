class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	protect_from_forgery except: :instagram

	def instagram
		first_time = User.where(:nickname => auth_hash.info.nickname).size == 0 ? true : false
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
		#if first_time
		if session[:redirect]
			redirect_to :root
		else
			render :json => response.to_json, :callback => 'callbackName'
		end
	end

	def auth_hash
		request.env["omniauth.auth"]
	end

	def failure
		redirect_to :root
	end
end

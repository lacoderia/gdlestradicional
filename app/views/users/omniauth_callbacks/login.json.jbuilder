json.success @success
if @success
	json.set! :user do
		json.extract! @user, :id, :uid, :nickname, :picture
		json.likes @results
	end
end
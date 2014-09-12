class Ability
  include CanCan::Ability

  def initialize(user, format)
    user ||= User.new # guest user
     if user.role? :admin
      can :manage, :all
	  else
      cannot :manage, :all
			if format == 'json'
				can :read, :all
			else
				cannot :read, :all
			end
		  can :manage, :display
			can :all, Route
			can [:recent, :like, :activate], Photo
			can :activate, CuervoPhoto 
			can :especial, Influencer
			can [:gallery, :especial], Location
			can :activate, Tweet
			can :update_mail, User
		end
	end
end

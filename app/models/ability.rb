class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user
     if user.role? :admin
      can :manage, :all
	  else
      cannot :manage, :all
		  can :manage, :display
	  end
  end
end

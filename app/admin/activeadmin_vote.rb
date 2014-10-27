ActiveAdmin.register Vote do

  actions :all, :except => [:new, :edit, :destroy] 

  config.filters = false

  index do
    column :name
    column "Email" do |user|
      user.isUser ? (link_to user.email, admin_user_path(user) ) : user.email
    end
    column :answer
    column "Route" do |vote|
      vote.route.name
    end
    column "Subscribe" do |user|
      user.subscribe ? "Sí" : "No"
    end
  end
end

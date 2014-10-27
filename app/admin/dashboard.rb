ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    div class: "blank_slate_container", id: "dashboard_default_message" do
		columns do
			column do
				panel "Estadísticas" do
                    div do	label_tag "Usuarios totales: #{User.count}" end
                    div do	label_tag "Fotos totales: #{Photo.count}" end
                    div do  label_tag "Fotos inactivas: #{Photo.where('active =?', false).count}" end
                    div do  label_tag "Votos totales: #{Vote.all.count}" end
				end
                panel "Iluminación" do
                    div do  label_tag "20 octubre: 0"   end
                    div do  label_tag "21 octubre: 7"   end
                    div do  label_tag "22 octubre: 6"   end
                    div do  label_tag "23 octubre: 0"   end
                    div do  label_tag "24 octubre: 5"   end
                    div do  label_tag "25 octubre: 6"   end
                    div do  label_tag "26 octubre: 13"  end
                end
			end
		end
    end

    # Here is an example of a simple dashboard with columns and panels.
    #
    # columns do
    #   column do
    #     panel "Recent Posts" do
    #       ul do
    #         Post.recent(5).map do |post|
    #           li link_to(post.title, admin_post_path(post))
    #         end
    #       end
    #     end
    #   end

    #   column do
    #     panel "Info" do
    #       para "Welcome to ActiveAdmin."
    #     end
    #   end
    # end
  end # content
end

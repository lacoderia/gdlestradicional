Rails.application.routes.draw do
  
  resources :influencers do
		member do
			post 'especial'
		end
	end


  resources :tweets do
		member do
			post 'activate'
		end
	end

  resources :cuervo_photos do
		member do
			post 'activate'
		end
	end

  resources :galleries

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  resources :locations do
    member do
      get 'gallery'
			post 'especial'
    end
  end

  resources :photos do
    collection do
      get 'recent'
    end
    member do
      post 'like'
			post 'activate'
    end
  end

  resources :roles

  resources :routes do
    collection do
      get 'all'
    end
  end

  resources :users do
    member do
      post 'update_mail'
    end
  end

  devise_for :users, :controllers => {:registrations => "users/registrations", :sessions => 'users/sessions', :omniauth_callbacks => "users/omniauth_callbacks"}
  devise_scope :user do
	  get 'logout', :to => "devise/sessions#destroy"
	  get 'signin', :to => "devise/sessions#new"
	  get 'signup', :to => "devise/registrations#new"
  end

  match 'instagram_push' => "display#instagram_push", :as => :instagram_push, via: [:get, :post] 
  get 'relocated' => "display#relocated", :as => :relocated
  get 'get_illumination' => 'display#get_illumination', :as => :get_illumination
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'display#index'
  get "mobile" => "display#mobile"
  #get "home" =>"display#home"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

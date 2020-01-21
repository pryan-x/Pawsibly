Rails.application.routes.draw do
  resources :users do
    collection do
      put "/:user_id/breeds", to: "breeds#update"
      delete "/:user_id/breeds", to: "breeds#destroy"
    end
    resources :breeds do
    end
  end


  resources :users do
    collection do
      post "/login", to: "users#login"
      post "/register", to: "users#register"
    end
  end
  # resources :users 
  # resources :breeds
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

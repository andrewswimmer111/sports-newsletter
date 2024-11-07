Rails.application.routes.draw do
  resources :users do

    collection do
      post '/login', to: 'sessions#create'       # Route for logging in
      delete '/logout', to: 'sessions#destroy'   # Route for logging out
      get '/current_user', to: 'sessions#current_user'  # Route to get the currently logged-in user
      post '/register', to: 'sessions#register'  # Route for registering a new user
    end

    member do
      get 'get_teams'
    end

  end
  
  resources :sports
  resources :teams
  resources :user_teams, only: [:create] # For handling relationships between users and teams

  get 'api/teams', to: 'teams#index'
end


# !Note from Alex: add this code if you want to work with the Sidekiq Web UI
# What is Sidekiq? Sidekiq is a background processing framework for Ruby. It uses threads to handle many jobs at the same time in the same process. It does not require Rails but will integrate tightly with Rails 3/4/5 to make background processing dead simple.  
# For Sidekiq Web UI
# require "sidekiq/web"
# mount Sidekiq::Web => "/sidekiq"

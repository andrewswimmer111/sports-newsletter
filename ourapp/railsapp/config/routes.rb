# This is the end of the Rails application routes configuration.
# It marks the end of the block where routes are defined using the `draw` method.
# Any additional code should be placed after this line.
Rails.application.routes.draw do
  resources :users do
    collection do
      post 'login' # This will route POST requests to /users/login to the login action in UsersController
    end
  end
  
  resources :sports
  resources :teams
  resources :user_teams, only: [:create] # For handling relationships between users and teams
end


# !Note from Alex: add this code if you want to work with the Sidekiq Web UI
# What is Sidekiq? Sidekiq is a background processing framework for Ruby. It uses threads to handle many jobs at the same time in the same process. It does not require Rails but will integrate tightly with Rails 3/4/5 to make background processing dead simple.  
# For Sidekiq Web UI
# require "sidekiq/web"
# mount Sidekiq::Web => "/sidekiq"

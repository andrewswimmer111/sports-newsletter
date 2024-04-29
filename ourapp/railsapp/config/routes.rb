Rails.application.routes.draw do
  # Define all RESTful resources

  # Define the routes for the API



  # !Note from Alex: Keep this code if you want to work with the Sidekiq Web UI
  # What is Sidekiq? Sidekiq is a background processing framework for Ruby. It uses threads to handle many jobs at the same time in the same process. It does not require Rails but will integrate tightly with Rails 3/4/5 to make background processing dead simple.  
  # For Sidekiq Web UI
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

end

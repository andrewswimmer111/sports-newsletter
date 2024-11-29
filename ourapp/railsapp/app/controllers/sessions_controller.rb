class SessionsController < ApplicationController
    # Register action
    def register
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: { message: "Registered successfully", user: user }, status: :ok
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # Login action
    def create
      user = User.find_by(email: params[:email])
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: "Logged in successfully", user: user }, status: :ok
      else
        render json: { message: "Invalid email or password" }, status: :unauthorized
      end
    end
  
    # Logout action
    def destroy
      session[:user_id] = nil
      render json: { message: "Logged out successfully" }, status: :ok
    end
  
    # Current user action
    def current_user
      user = User.find_by(id: session[:user_id])
      if user
        render json: { user: user }, status: :ok
      else
        render json: { message: "No user logged in" }, status: :unauthorized
      end
    end

    private
    def user_params
        params.permit(:name, :email, :password, :password_confirmation)
    end
end
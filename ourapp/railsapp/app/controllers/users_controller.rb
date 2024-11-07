class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user, notice: 'User was successfully created.'
    else
      render :new
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      render json: { message: 'Login successful', user: user }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def get_teams
    user = User.find_by(id: params[:id])
    if user
      teams = user.teams
      render json: { teams: teams }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
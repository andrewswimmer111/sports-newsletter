class UsersController < ApplicationController

  def index
    @users = User.all
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

  # Needed by React

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: { message: 'Profile updated successfully.', user: @user }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Custom actions
  def login
    user_params = params.permit(:email, :password)
    puts user_params

    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
      render json: { message: 'Login successful', user: user }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def get_teams
    user_params = params.permit(:id)

    user = User.find_by(id: user_params[:id])
    teams = user.teams
    render json: {teams: teams}
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end

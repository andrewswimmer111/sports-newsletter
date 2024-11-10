class UsersController < ApplicationController

  before_action :set_user, only: [:update]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    render json: @user
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

  def update

    # Ensure current password is present
    if update_params[:currentPassword].blank?
      return render json: { error: 'Current password is required' }, status: :unprocessable_entity
    end

    # Check if the current password is correct
    unless @user.authenticate(update_params[:currentPassword])
      return render json: { error: 'Current password is incorrect' }, status: :unauthorized
    end

    # Create update data
    filtered_params = update_params.compact_blank

    if filtered_params[:newPassword].present?
      filtered_params[:password] = filtered_params[:newPassword]
    end

    filtered_params.delete(:newPassword)
    filtered_params.delete(:confirmPassword)
    filtered_params.delete(:currentPassword)

    # Do the updating
    if @user.update(filtered_params)
      render json: { user: @user, message: 'User updated successfully' }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  
  def set_user
    @user = User.find_by(id: params[:id])  
    unless @user
      render json: { error: 'User not found' }, status: :not_found and return
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def update_params
    params.permit(:name, :email, :newPassword, :confirmPassword, :currentPassword)
  end
end
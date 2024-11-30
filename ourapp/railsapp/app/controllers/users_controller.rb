class UsersController < ApplicationController

  wrap_parameters format: []

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

    # Find user
    @user = User.find_by(id: update_params[:id])  
    unless @user
      render json: { error: 'User not found' }, status: :not_found and return
    end

    # Check if the current password matches
    unless @user.authenticate(update_params[:currentPassword])
      return render json: { error: 'Current password is incorrect' }, status: :unauthorized
    end
  
    # Prepare the parameters for updating
    filtered_params = update_params.compact_blank
  
    # If a new password is provided, set it as the user's password
    if filtered_params[:newPassword].present?
      filtered_params[:password] = filtered_params[:newPassword]
    end
  
    # Remove temporary fields that should not be saved
    filtered_params.delete(:newPassword)
    filtered_params.delete(:confirmPassword)
    filtered_params.delete(:currentPassword)
    filtered_params.delete(:id)

    puts(filtered_params)
  
    # Perform the update
    if @user.update(filtered_params)
      render json: { user: @user, message: 'User updated successfully' }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    
    if @user
            
      if @user.destroy
        render json: { message: 'User account deleted successfully' }, status: :ok
      else
        render json: { error: 'Failed to delete account' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private
  

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def update_params
    params.require(:user).permit(:id, :name, :email, :newPassword, :confirmPassword, :currentPassword)
  end
end
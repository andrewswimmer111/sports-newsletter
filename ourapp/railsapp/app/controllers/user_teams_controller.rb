class UserTeamsController < ApplicationController
  def create
    @user_team = UserTeam.new(user_team_params)
    if @user_team.save
      redirect_to @user_team.user, notice: 'Team was successfully followed.'
    else
      render :new
    end
  end

  private

  def user_team_params
    params.require(:user_team).permit(:user_id, :team_id)
  end
end

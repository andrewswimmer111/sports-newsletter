class UserTeamsController < ApplicationController
  def create
    team_ids = user_team_params[:team_ids]
    user_id = user_team_params[:user_id]
  
    begin
      UserTeam.transaction do
        team_ids.each do |team_id|
          UserTeam.find_or_create_by!(user_id: user_id, team_id: team_id)
        end
      end
      render json: { message: 'Teams were successfully followed.', status: :ok }
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: 'There was an error following the teams.', details: e.message, status: :unprocessable_entity }
    end
  end
  

  private

  def user_team_params
    params.require(:user_teams).permit(:user_id, team_ids: [])
  end
end

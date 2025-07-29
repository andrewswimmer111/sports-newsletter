class TeamsController < ApplicationController
  def index
    league = params[:league]
    if league.present?
      teams = Team.where(league: league)
      render json: teams
    else
      render json: { error: 'League parameter is required' }, status: :bad_request
    end
  end

  def show
    @team = Team.find(params[:id])
  end

  def new
    @team = Team.new
  end

  def create
    @team = Team.new(team_params)
    if @team.save
      redirect_to @team, notice: 'Team was successfully created.'
    else
      render :new
    end
  end

  private

  def team_params
    params.require(:team).permit(:name, :league)  
  end
end
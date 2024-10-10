class SportsController < ApplicationController
  def index
    @sports = Sport.all
  end

  def show
    @sport = Sport.find(params[:id])
  end

  def new
    @sport = Sport.new
  end

  def create
    @sport = Sport.new(sport_params)
    if @sport.save
      redirect_to @sport, notice: 'Sport was successfully created.'
    else
      render :new
    end
  end

  private

  def sport_params
    params.require(:sport).permit(:name)
  end
end

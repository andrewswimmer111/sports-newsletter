class JoinTableUserProjectsController < ApplicationController
  before_action :set_join_table_user_project, only: %i[ show edit update destroy ]

  # GET /join_table_user_projects or /join_table_user_projects.json
  def index
    @join_table_user_projects = JoinTableUserProject.all
  end

  # GET /join_table_user_projects/1 or /join_table_user_projects/1.json
  def show
  end

  # GET /join_table_user_projects/new
  def new
    @join_table_user_project = JoinTableUserProject.new
  end

  # GET /join_table_user_projects/1/edit
  def edit
  end

  # POST /join_table_user_projects or /join_table_user_projects.json
  def create
    @join_table_user_project = JoinTableUserProject.new(join_table_user_project_params)

    respond_to do |format|
      if @join_table_user_project.save
        format.html { redirect_to join_table_user_project_url(@join_table_user_project), notice: "Join table user project was successfully created." }
        format.json { render :show, status: :created, location: @join_table_user_project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @join_table_user_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /join_table_user_projects/1 or /join_table_user_projects/1.json
  def update
    respond_to do |format|
      if @join_table_user_project.update(join_table_user_project_params)
        format.html { redirect_to join_table_user_project_url(@join_table_user_project), notice: "Join table user project was successfully updated." }
        format.json { render :show, status: :ok, location: @join_table_user_project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @join_table_user_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /join_table_user_projects/1 or /join_table_user_projects/1.json
  def destroy
    @join_table_user_project.destroy

    respond_to do |format|
      format.html { redirect_to join_table_user_projects_url, notice: "Join table user project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_join_table_user_project
      @join_table_user_project = JoinTableUserProject.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def join_table_user_project_params
      params.require(:join_table_user_project).permit(:user_id, :project_id)
    end
end

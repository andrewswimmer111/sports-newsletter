class CreateJoinTableUserProjectsController < ApplicationController
  before_action :set_create_join_table_user_project, only: %i[ show edit update destroy ]

  # GET /create_join_table_user_projects or /create_join_table_user_projects.json
  def index
    @create_join_table_user_projects = CreateJoinTableUserProject.all
  end

  # GET /create_join_table_user_projects/1 or /create_join_table_user_projects/1.json
  def show
  end

  # GET /create_join_table_user_projects/new
  def new
    @create_join_table_user_project = CreateJoinTableUserProject.new
  end

  # GET /create_join_table_user_projects/1/edit
  def edit
  end

  # POST /create_join_table_user_projects or /create_join_table_user_projects.json
  def create
    @create_join_table_user_project = CreateJoinTableUserProject.new(create_join_table_user_project_params)

    respond_to do |format|
      if @create_join_table_user_project.save
        format.html { redirect_to create_join_table_user_project_url(@create_join_table_user_project), notice: "Create join table user project was successfully created." }
        format.json { render :show, status: :created, location: @create_join_table_user_project }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @create_join_table_user_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /create_join_table_user_projects/1 or /create_join_table_user_projects/1.json
  def update
    respond_to do |format|
      if @create_join_table_user_project.update(create_join_table_user_project_params)
        format.html { redirect_to create_join_table_user_project_url(@create_join_table_user_project), notice: "Create join table user project was successfully updated." }
        format.json { render :show, status: :ok, location: @create_join_table_user_project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @create_join_table_user_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /create_join_table_user_projects/1 or /create_join_table_user_projects/1.json
  def destroy
    @create_join_table_user_project.destroy

    respond_to do |format|
      format.html { redirect_to create_join_table_user_projects_url, notice: "Create join table user project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_create_join_table_user_project
      @create_join_table_user_project = CreateJoinTableUserProject.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def create_join_table_user_project_params
      params.require(:create_join_table_user_project).permit(:user_id, :project_id)
    end
end

require "test_helper"

class JoinTableUserProjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @join_table_user_project = join_table_user_projects(:one)
  end

  test "should get index" do
    get join_table_user_projects_url
    assert_response :success
  end

  test "should get new" do
    get new_join_table_user_project_url
    assert_response :success
  end

  test "should create join_table_user_project" do
    assert_difference("JoinTableUserProject.count") do
      post join_table_user_projects_url, params: { join_table_user_project: { project_id: @join_table_user_project.project_id, user_id: @join_table_user_project.user_id } }
    end

    assert_redirected_to join_table_user_project_url(JoinTableUserProject.last)
  end

  test "should show join_table_user_project" do
    get join_table_user_project_url(@join_table_user_project)
    assert_response :success
  end

  test "should get edit" do
    get edit_join_table_user_project_url(@join_table_user_project)
    assert_response :success
  end

  test "should update join_table_user_project" do
    patch join_table_user_project_url(@join_table_user_project), params: { join_table_user_project: { project_id: @join_table_user_project.project_id, user_id: @join_table_user_project.user_id } }
    assert_redirected_to join_table_user_project_url(@join_table_user_project)
  end

  test "should destroy join_table_user_project" do
    assert_difference("JoinTableUserProject.count", -1) do
      delete join_table_user_project_url(@join_table_user_project)
    end

    assert_redirected_to join_table_user_projects_url
  end
end

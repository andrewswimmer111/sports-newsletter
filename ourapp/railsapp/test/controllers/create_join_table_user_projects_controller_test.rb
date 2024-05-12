require "test_helper"

class CreateJoinTableUserProjectsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @create_join_table_user_project = create_join_table_user_projects(:one)
  end

  test "should get index" do
    get create_join_table_user_projects_url
    assert_response :success
  end

  test "should get new" do
    get new_create_join_table_user_project_url
    assert_response :success
  end

  test "should create create_join_table_user_project" do
    assert_difference("CreateJoinTableUserProject.count") do
      post create_join_table_user_projects_url, params: { create_join_table_user_project: { project_id: @create_join_table_user_project.project_id, user_id: @create_join_table_user_project.user_id } }
    end

    assert_redirected_to create_join_table_user_project_url(CreateJoinTableUserProject.last)
  end

  test "should show create_join_table_user_project" do
    get create_join_table_user_project_url(@create_join_table_user_project)
    assert_response :success
  end

  test "should get edit" do
    get edit_create_join_table_user_project_url(@create_join_table_user_project)
    assert_response :success
  end

  test "should update create_join_table_user_project" do
    patch create_join_table_user_project_url(@create_join_table_user_project), params: { create_join_table_user_project: { project_id: @create_join_table_user_project.project_id, user_id: @create_join_table_user_project.user_id } }
    assert_redirected_to create_join_table_user_project_url(@create_join_table_user_project)
  end

  test "should destroy create_join_table_user_project" do
    assert_difference("CreateJoinTableUserProject.count", -1) do
      delete create_join_table_user_project_url(@create_join_table_user_project)
    end

    assert_redirected_to create_join_table_user_projects_url
  end
end

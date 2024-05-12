require "application_system_test_case"

class JoinTableUserProjectsTest < ApplicationSystemTestCase
  setup do
    @join_table_user_project = join_table_user_projects(:one)
  end

  test "visiting the index" do
    visit join_table_user_projects_url
    assert_selector "h1", text: "Join table user projects"
  end

  test "should create join table user project" do
    visit join_table_user_projects_url
    click_on "New join table user project"

    fill_in "Project", with: @join_table_user_project.project_id
    fill_in "User", with: @join_table_user_project.user_id
    click_on "Create Join table user project"

    assert_text "Join table user project was successfully created"
    click_on "Back"
  end

  test "should update Join table user project" do
    visit join_table_user_project_url(@join_table_user_project)
    click_on "Edit this join table user project", match: :first

    fill_in "Project", with: @join_table_user_project.project_id
    fill_in "User", with: @join_table_user_project.user_id
    click_on "Update Join table user project"

    assert_text "Join table user project was successfully updated"
    click_on "Back"
  end

  test "should destroy Join table user project" do
    visit join_table_user_project_url(@join_table_user_project)
    click_on "Destroy this join table user project", match: :first

    assert_text "Join table user project was successfully destroyed"
  end
end

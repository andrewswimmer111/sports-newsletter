require "application_system_test_case"

class CreateJoinTableUserProjectsTest < ApplicationSystemTestCase
  setup do
    @create_join_table_user_project = create_join_table_user_projects(:one)
  end

  test "visiting the index" do
    visit create_join_table_user_projects_url
    assert_selector "h1", text: "Create join table user projects"
  end

  test "should create create join table user project" do
    visit create_join_table_user_projects_url
    click_on "New create join table user project"

    fill_in "Project", with: @create_join_table_user_project.project_id
    fill_in "User", with: @create_join_table_user_project.user_id
    click_on "Create Create join table user project"

    assert_text "Create join table user project was successfully created"
    click_on "Back"
  end

  test "should update Create join table user project" do
    visit create_join_table_user_project_url(@create_join_table_user_project)
    click_on "Edit this create join table user project", match: :first

    fill_in "Project", with: @create_join_table_user_project.project_id
    fill_in "User", with: @create_join_table_user_project.user_id
    click_on "Update Create join table user project"

    assert_text "Create join table user project was successfully updated"
    click_on "Back"
  end

  test "should destroy Create join table user project" do
    visit create_join_table_user_project_url(@create_join_table_user_project)
    click_on "Destroy this create join table user project", match: :first

    assert_text "Create join table user project was successfully destroyed"
  end
end

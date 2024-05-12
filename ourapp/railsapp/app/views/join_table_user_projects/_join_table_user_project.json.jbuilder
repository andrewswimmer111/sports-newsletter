json.extract! join_table_user_project, :id, :user_id, :project_id, :created_at, :updated_at
json.url join_table_user_project_url(join_table_user_project, format: :json)

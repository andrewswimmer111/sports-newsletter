class AddApiIdToTeams < ActiveRecord::Migration[7.0]
  def change
    add_column :teams, :api_id, :bigint
  end
end

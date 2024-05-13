class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    unless table_exists?(:projects)
      create_table :projects do |t|
        t.string :title
        t.string :type

        t.timestamps
      end
    end
  end
end

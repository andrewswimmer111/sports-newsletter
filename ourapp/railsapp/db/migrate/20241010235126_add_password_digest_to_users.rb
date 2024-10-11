class AddPasswordDigestToUsers < ActiveRecord::Migration[7.0]
  def change
    drop_table :walkers if table_exists?(:walkers) 
    remove_column :users, :password, :string if column_exists?(:users, :password)
    add_column :users, :password_digest, :string # Rails secure password
  end
end

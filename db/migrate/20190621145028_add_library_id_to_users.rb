class AddLibraryIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :library_id, :integer
  end
end

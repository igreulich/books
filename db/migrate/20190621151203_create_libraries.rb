class CreateLibraries < ActiveRecord::Migration[5.2]
  def change
    create_table :libraries do |t|
      t.timestamps
    end

    add_reference :libraries, :user, foreign_key: true
  end
end

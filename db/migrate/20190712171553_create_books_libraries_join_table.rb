class CreateBooksLibrariesJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_table :books_libraries, id: false do |t|
      t.belongs_to :book, index: true
      t.belongs_to :library, index: true
    end
  end
end

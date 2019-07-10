class CreateBooksAndAuthors < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :series
      t.integer :number

      t.timestamps
    end

    create_table :authors do |t|
      t.string :name

      t.timestamps
    end

    create_table :authors_books, id: false do |t|
      t.belongs_to :book, index: true
      t.belongs_to :author, index: true
    end
  end
end

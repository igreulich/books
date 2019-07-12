class BooksController < ApplicationController
  # The instance variables in these functions are available to the calling methods
  before_action :load_book, only: [:show, :update, :destroy]
  before_action :load_books, only: [:index, :destroy]

  def index
  end

  def show
    render_resource(@book)
  end

  def create
    @book = Book.new(book_params)

    @book.save

    render_resource(@book)
  end

  def update
    @book.update(book_params)

    render_resource(@book)
  end

  def destroy
    @book.destroy
  end

  private
  def load_books
    @books ||= Book.includes(:authors)
  end

  def load_book
    @book ||= Book.includes(:authors).find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :series, :number, {:author_ids=>[]})
  end
end

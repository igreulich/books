class BooksController < ApplicationController
  # The instance variable in load_book is available to the calling method
  before_action :load_book, only: [:show, :update, :destroy]

  def index
    @books = Book.includes(:authors)

    render json: @books
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

    render json: Book.all
  end

  private
  def load_book
    @book ||= Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :series, :number, {:author_ids=>[]})
  end
end

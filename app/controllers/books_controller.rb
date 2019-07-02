class BooksController < ApplicationController
  # The instance variable in load_book is available to the calling method
  before_action :load_book, only: [:update, :destroy]

  def index
    @books = Book.all
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      # respond to JSON
      redirect_to [:books] # respond to JSON
    else
      # not so much redirect, return an error response
      render :new
    end
  end

  def update
    if @book.update(book_params)
      # respond to JSON
      redirect_to [:books]
    else
      # not so much redirect, return an error response
      render :edit
    end
  end

  def destroy
    @book.destroy
    redirect_to [:books]
  end

  private
  def load_book
    @book ||= Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :series, :number)
  end
end

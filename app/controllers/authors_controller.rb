class AuthorsController < ApplicationController
  # The instance variables in these functions are available to the calling methods
  before_action :load_author, only: [:show, :update, :destroy]
  before_action :load_authors, only: [:index, :destroy]

  def index
  end

  def show
    render_resource(@author)
  end

  def create
    @author = Author.new(author_params)

    @author.save

    render_resource(@author)
  end

  def update
    @author.update(author_params)

    render_resource(@author)
  end

  def destroy
    @author.destroy
  end

  private
  def load_authors
    @authors = Author.includes(:books)
  end

  def load_author
    @author ||= Author.find(params[:id])
  end

  def author_params
    params.require(:author).permit(:name, {:book_ids=>[]})
  end
end

class AuthorsController < ApplicationController
  # The instance variable in load_author is available to the calling method
  before_action :load_author, only: [:show, :update, :destroy]

  def index
    @authors = Author.includes(:books)

    render json: @authors
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

    render json: Author.all
  end

  private
  def load_author
    @author ||= Author.find(params[:id])
  end

  def author_params
    params.require(:author).permit(:name, {:book_ids=>[]})
  end
end

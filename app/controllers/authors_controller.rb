class AuthorsController < ApplicationController
  # The instance variable in load_author is available to the calling method
  before_action :load_author, only: [:update, :destroy]

  def index
    @authors = Author.all
  end

  def create
    @author = Author.new(author_params)

    if @author.save
      # respond to JSON
      redirect_to [:authors] # respond to JSON
    else
      # not so much redirect, return an error response
      render :new
    end
  end

  def update
    if @author.update(author_params)
      # respond to JSON
      redirect_to [:authors]
    else
      # not so much redirect, return an error response
      render :edit
    end
  end

  def destroy
    @author.destroy
    redirect_to [:authors]
  end

  private
  def load_article
    @author ||= Author.find(params[:id])
  end

  def author_params
    params.require(:author).permit(:name)
  end
end

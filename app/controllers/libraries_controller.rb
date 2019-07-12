class LibrariesController < ApplicationController
  # The instance variables in these functions are available to the calling methods
  before_action :load_library, only: [:show, :update]

  def show
    # See controllers/application_controller.rb for more info
    render_resource(@library)
  end

  def update
    @library.update(library_params)

    render_resource(@library)
  end

  private
  def load_library
    @library ||= Library.includes(:books).includes(:user).find(params[:id])
  end

  def library_params
    params.require(:library).permit({:book_ids=>[]})
  end
end

class StaticPagesController < ActionController::Base
  def index
    render file: './projects-frontend/index.html'
  end
end
class StaticPagesController < ApplicationController
  def index
    render file: 'projects-frontend/index.html'
  end
end
class WelcomeController < ApplicationController
  def index
    render file: puts render_to_string('projects-frontend/index.html')
  end
end
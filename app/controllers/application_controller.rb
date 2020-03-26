class ApplicationController < ActionController::API
  class ApplicationController < ActionController::API
    def index
      render file: './projects-frontend/index.html'
    end
  end
end

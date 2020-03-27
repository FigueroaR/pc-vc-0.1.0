Rails.application.routes.draw do
  resources :contracts
  resources :contractors
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # match '*all', to: 'welcome#index', via: [:get]
  get '*other', to: 'static#index'
end

Rails.application.routes.draw do
  resources :supervisors
  resources :contracts
  resources :contractors
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

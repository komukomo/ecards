Rails.application.routes.draw do
  scope :api do
    patch 'cards/learn'
    post 'cards/upload', to: 'uploader#upload'
    resources :cards
  end
  get "/cards", to: 'pages#index'
  get '/learning', to: 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

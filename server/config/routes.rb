Rails.application.routes.draw do
  scope :api do
    patch 'cards/learn'
    resources :cards
  end
  get "/cards", to: 'pages#index'
  get '/learning', to: 'pages#index'
  post '/upload', to: 'uploader#upload'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

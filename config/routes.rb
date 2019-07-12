Rails.application.routes.draw do
  scope '/api' do
    scope '/v1' do
      devise_for :users,
                 path: '',
                 path_names: {
                   sign_in: 'login',
                   sign_out: 'logout',
                   registration: 'signup'
                 },
                 controllers: {
                   sessions: 'sessions',
                   registrations: 'registrations'
                 }

      resources :books, only: [:index, :create, :show, :update, :destroy]
      resources :authors, only: [:index, :create, :show, :update, :destroy]
      resources :libraries, only: [:show, :update]
    end
  end
end

class User < ApplicationRecord
  has_one :library
  before_create :build_default_library

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JWTBlacklist

  private
  # see https://stackoverflow.com/questions/3808782/rails-best-practice-how-to-create-dependent-has-one-relations
  # for more information
  def build_default_library
    build_library
    true
  end
end


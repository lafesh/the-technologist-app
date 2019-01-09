class User < ApplicationRecord 
    has_many :reviews
    has_many :categories, through: :reviews

    has_secure_password

    validates :username, :email, :password, presence: true
    validates :username, uniqueness: true 
    validates :email, uniqueness: true 
end
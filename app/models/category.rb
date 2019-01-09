class Category < ApplicationRecord 
    has_many :reviews
    has_many :users, through: :reviews

    validates :title, presence: true
    validates :title, length: { maximum: 50 }
end
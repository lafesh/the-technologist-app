class Review < ApplicationRecord 
    belongs_to :user 
    belongs_to :category 

    validates :content, presence: true 
    validates :content, length: { minimum: 250 }

    def self.most_recent
      all.order(created_at: :desc)
    end
end
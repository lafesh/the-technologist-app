class Review < ApplicationRecord 
    belongs_to :user 
    belongs_to :category 

    validates :content, presence: true 
    validates :content, length: { minimum: 100 }
    validates :title, presence: true

    def self.most_recent
      all.order(created_at: :desc)
    end

    def self.search(search)
      if search
        where('content LIKE ?', "%#{search}%").order('created_at DESC')
      else
        order('created_at DESC') 
      end
    end
end
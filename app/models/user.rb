class User < ApplicationRecord 
    has_many :reviews
    has_many :categories, through: :reviews

    has_secure_password

    validates :username, :email, :password, presence: true
    validates :username, uniqueness: true 
    validates :email, uniqueness: true 

    def self.from_omniauth(auth)
        where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
          user.email = auth.info.email
          user.uid = auth.uid
          user.provider = auth.provider
        #  user.avatar_url = auth.info.image
          user.username = auth.info.name
          user.oauth_token = auth.credentials.token
          user.password = SecureRandom.hex 
          user.save!
        end
      end
end
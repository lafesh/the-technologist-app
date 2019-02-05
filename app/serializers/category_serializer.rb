class CategorySerializer < ActiveModel::Serializer
    attributes :title, :id
    has_many :reviews
end
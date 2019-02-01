class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at
  #belongs_to :user

  def truncate_review
  end
  
end

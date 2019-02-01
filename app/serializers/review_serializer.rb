class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at

  def truncate_review
  end

end

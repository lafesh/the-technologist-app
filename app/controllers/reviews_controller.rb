class ReviewsController < ApplicationController
before_action :set_review, only: [:show, :update, :edit, :destroy]
before_action :is_authorized?, except: [:index, :show, :new, :create]

    def index
     # if logged_in?
     #   @reviews = current_user.reviews
        @reviews = Review.most_recent unless @reviews = Review.search(params[:search]) #|| Review.search_user(params[:user])
     # end
    end

    def show
    end

    def new
      @review = Review.new
    end

    def create
      if logged_in?
        @category = Category.find(review_params[:category_id])
        @review = @category.reviews.build(review_params)
        @review.user = current_user
        if @review.save
          flash[:success] = "You have successfully created a review!"
          redirect_to user_path(current_user)
        else 
            flash[:error] = @review.errors.full_messages[0]
            redirect_to new_review_path
        end
      end
    end

    def edit 
    end

    def update
      if @review.update(review_params)
        flash[:success] = "You have successfully updated your review!"
        redirect_to review_path(@review)
      else 
        flash[:error] = @review.errors.full_messages[0]
        redirect_to edit_review_path
      end
    end

    def destroy 
      if @review.destroy
        flash[:success] = "You have successfully deleted your review."
        #redirect_to user_review_path(@user.review)
        redirect_to root_path
      else 
        flash[:error] = @review.errors.full_messages[0]
        redirect_to edit_review_path
      end
    end

    private 

    def review_params
      params.require(:review).permit(:title, :content, :category_id, :search)
    end

    def set_review
      @review = Review.find(params[:id]) if params[:id]
    end

    def is_authorized?
      flash[:error] = "Oops! You are not authorized to do that." unless current_user == @review.user 
      redirect_to reviews_path unless current_user == @review.user 
    end
end
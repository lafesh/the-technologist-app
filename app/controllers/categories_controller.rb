class CategoriesController < ApplicationController

    def show
     @categories = Category.all.order(created_at: :desc)
    end

    def new
      @category = Category.new
      @review = @category.reviews.build
    end

    def create
      if logged_in?
        @category = Category.create(category_params)
        if @category.save
          flash[:success] = "You have successfully created a category!"
          redirect_to root_path
      else 
        flash[:error] = @category.errors.full_messages[0]
        render :new
        end
      end
    end

    private 

    def category_params
      params.require(:category).permit(:title)
    end
end
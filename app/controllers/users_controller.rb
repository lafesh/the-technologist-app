class UsersController < ApplicationController
    def index
      @users = User.all
    end

    def show
      @user = User.find(params[:id])

      respond_to do |format|
        format.html { render :show }
        format.json { render json: @user }
      end
    end

    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params)
      if @user.save 
        flash[:success] = "You have successfully created an account!"
        session[:user_id] = @user.id 
        redirect_to user_path(@user)
      else 
        flash[:error] = "Oops! Invalid entry. Please try again."
        render :new
      end
    end

    private 

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
class SessionsController < ApplicationController

    def new 
    end

    def create 
      @user = User.find_by(email: sessions_params[:email]) 
      if @user && @user.authenticate(sessions_params[:password])
        session[:user_id] = @user.id
        flash[:success] = "You have successfully logged in!"
        redirect_to user_path(@user)
      else 
        flash[:message] = "Oops! There was an error. Please try again."
        redirect_to login_path
      end
    end

    def github_auth
      user = User.from_omniauth(request.env["omniauth.auth"])

      if user.valid?
        session[:user_id] = user.id
       redirect_to user_path(user)
      end
    end

    def logout
      session.destroy
      flash[:success] = "You have successfully logged out."
      redirect_to login_path
    end

    private 

    def sessions_params
      params.require(:session).permit(:email, :password)
    end

end
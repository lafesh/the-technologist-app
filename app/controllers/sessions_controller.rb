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
      if auth 
        @user = User.find_or_create_by(uid: auth['uid']) do |user|
          user.username = auth['info']['name']
          user.email = auth['info']['email']
          user.password = SecureRandom.hex
        end
    
        session[:user_id] = @user.id
        redirect_to @user
    
        else
          flash[:error] = "Oops! There was an error. Please try again."
          redirect_to root_path
    #  user = User.find_or_create_by(uid: auth[:uid])
    #  user.username = auth[:info][:name]
    #  user.email = auth[:info][:email]
      #user.password = SecureRandom.hex(9)
    #  user.save
    #  session[:user_id] = user.id
      #end 
    #  redirect_to user_path(user)
        end
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

    def auth 
      request.env['omniauth.auth']
    end

end
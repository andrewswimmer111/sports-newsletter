class UserMailer < ApplicationMailer
    def game_results_email
      @user = params[:user]
      @content = params[:content]
      mail(to: @user.email, subject: 'Your Favorite Teams Game Results')
    end
  end
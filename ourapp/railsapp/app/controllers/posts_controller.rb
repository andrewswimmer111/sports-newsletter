# app/controllers/posts_controller.rb

class PostsController < ApplicationController
  before_action :set_user
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /users/:user_id/posts
  def index
    @posts = @user.posts
    render json: @posts
  end

  # GET /users/:user_id/posts/:id
  def show
    render json: @post
  end

  # POST /users/:user_id/posts
  def create
    @post = @user.posts.build(post_params)
    if @post.save
      render json: @post, status: :created, location: api_user_post_url(@user, @post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:user_id/posts/:id
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/posts/:id
  def destroy
    @post.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_post
    @post = @user.posts.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end

end

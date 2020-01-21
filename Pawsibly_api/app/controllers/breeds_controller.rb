class BreedsController < ApplicationController
  before_action :set_breed, only: [
    # :show, :update, 
    :destroy]
  # skip_before_action :verify_authenticity_token

  # GET /breeds
  def index
    @breeds = Breed.all

    render json: @breeds
  end

  # GET /breeds/1


  # POST /breeds
  def create
    @breed = Breed.new(breed_params)
    @user = User.find(params[:user_id])
    @breed.user_id = @user.id
# puts @breed
logger.info(@breed)

    if @breed.save!
      render json: @breed, status: :created
    else
      render json: @breed.errors, status: :unprocessable_entity
    end
    # render json: {breed: :breed_params}
  end

  # PATCH/PUT /breeds/1
  def update
    logger.info(breed_params)
    @breed = Breed.find(params[:user_id])
    if @breed.update(breed_params)
      render json: @breed
    else
      render json: @breed.errors, status: :unprocessable_entity
    end
  end

  # DELETE /breeds/1
  def destroy
    @breed = Breed.find(params[:user_id])
    @breed.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_breed
      @breed = Breed.find(params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def breed_params
      params.permit(:user_id, breed_list: [])
      # params
      # MAYBE THIS IS ISSUE
    end
end

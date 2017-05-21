class CardsController < ApplicationController
  before_action :set_card, only: [:show, :update, :destroy]

  # GET /cards
  def index
    if params[:learn] == '1'
      ncards = params[:limit] || 10 # TODO external file
      @cards = Card.where("learntime < datetime()").order('updated_at, learntime').limit(ncards.to_i)
    else
      @cards = Card.order('created_at DESC').paginate(page: params[:p])
    end

    render json: @cards
  end

  # GET /cards/1
  def show
    render json: @card
  end

  # POST /cards
  def create
    @card = Card.new(card_params)

    if @card.save
      render json: @card, status: :created, location: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cards/1
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy
  end

  # PATCH /cards/learn
  def learn
    params[:_json].each do |d|
      card = Card.find(d[0])
      card.learn(d[1])
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def card_params
      params.require(:card).permit(:front, :front_sup, :back, :back_sup, :level, :learntime)
    end
end

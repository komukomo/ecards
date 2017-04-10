require 'test_helper'

class CardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card = cards(:one)
    @card2 = cards(:two)
    @card3 = cards(:three)
  end

  test "should get index" do
    get cards_url, as: :json
    assert_response :success
    assert_match 'should-be-learned', response.body
    assert_match 'has-been-learned', response.body
  end

  test "should create card" do
    assert_difference('Card.count') do
      post cards_url, params: {
        card: {
          back: @card.back,
          back_sup: @card.back_sup,
          front: @card.front,
          front_sup: @card.front_sup,
          learntime: @card.learntime,
          level: @card.level
        }
      }, as: :json
    end

    assert_response 201
  end

  test "should show card" do
    get card_url(@card), as: :json
    assert_response :success
  end

  test "should update card" do
    patch card_url(@card), params: {
      card: {
        front: @card.front,
        front_sup: @card.front_sup,
        back: @card.back,
        back_sup: @card.back_sup,
        learntime: @card.learntime,
        level: @card.level
      }
    }, as: :json
    assert_response 200
  end

  test "should destroy card" do
    assert_difference('Card.count', -1) do
      delete card_url(@card), as: :json
    end

    assert_response 204
  end

  test "should learn cards" do
    get cards_url, params: {learn: 1}
    assert_match 'should-be-learned', response.body
    assert_no_match 'has-been-learned', response.body
    assert_match 'should-be-learned-first', JSON.parse(response.body).first.to_s
  end

  test "should update levels" do
    get cards_url, params: {learn: 1}
    assert_match @card.front, response.body
    assert_match @card3.front, response.body
    get card_url(@card)
    assert_not_equal 10, JSON.parse(response.body)['level']
    get card_url(@card3)
    assert_not_equal 20, JSON.parse(response.body)['level']

    patch cards_learn_url, params: [[1, 10], [3, 20]], as: :json

    get card_url(@card)
    assert_equal 10, JSON.parse(response.body)['level']
    get card_url(@card3)
    assert_equal 20, JSON.parse(response.body)['level']
    get cards_url, params: {learn: 1}
    assert_no_match @card.front, response.body
    assert_no_match @card3.front, response.body
  end
end

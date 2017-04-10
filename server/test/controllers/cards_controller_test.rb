require 'test_helper'

class CardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card = cards(:one)
    @card2 = cards(:two)
  end

  test "should get index" do
    get cards_url, as: :json
    assert_response :success
    assert_match 'should-be-learned', response.body
    assert_match 'has-been-learned', response.body
  end

  test "should create card" do
    assert_difference('Card.count') do
      post cards_url, params: { card: { back: @card.back, front: @card.front, learntime: @card.learntime, level: @card.level } }, as: :json
    end

    assert_response 201
  end

  test "should show card" do
    get card_url(@card), as: :json
    assert_response :success
  end

  test "should update card" do
    patch card_url(@card), params: { card: { back: @card.back, front: @card.front, learntime: @card.learntime, level: @card.level } }, as: :json
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
  end

  test "should update levels" do
    get card_url(@card)
    assert_not_equal 10, JSON.parse(response.body)['level']
    get card_url(@card2)
    assert_not_equal 20, JSON.parse(response.body)['level']
    patch cards_learn_url, params: [[1, 10], [2, 20]], as: :json
    get card_url(@card)
    assert_equal 10, JSON.parse(response.body)['level']
    get card_url(@card2)
    assert_equal 20, JSON.parse(response.body)['level']
  end
end

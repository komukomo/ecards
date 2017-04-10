require 'test_helper'

class LearningCardsTest < ActionDispatch::IntegrationTest

  test "The new card shold be learned immediately" do
    post cards_url, params: {
      card: {
        front: "new card front",
        back: "new card back",
      }
    }, as: :json
    get cards_url, params: {learn: 1}
    assert_match "new card front", response.body
  end
end

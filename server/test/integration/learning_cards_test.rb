require 'test_helper'

class LearningCardsTest < ActionDispatch::IntegrationTest

  test "The recently updated cards shold be shown prior to new cards" do
    post cards_url, params: {
      card: {
        front: "new card front",
        back: "new card back",
      }
    }, as: :json
    get cards_url, params: {learn: 1}
    assert_no_match "new card front", response.body
  end
end

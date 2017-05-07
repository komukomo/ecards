require 'test_helper'


class UploaderControllerTest < ActionDispatch::IntegrationTest
  test "upload cards formatted tsv" do
    # destoy all for the bottom assertion
    Card.all.each(&:destroy)

    file = fixture_file_upload('test/fixtures/4cards.tsv', 'text/plain')
    post cards_upload_url, params: {file: file}
    get cards_url
    assert_equal 4, response.body.scan("ok").size
  end
end

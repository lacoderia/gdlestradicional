require 'test_helper'

class InfluencersControllerTest < ActionController::TestCase
  setup do
    @influencer = influencers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:influencers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create influencer" do
    assert_difference('Influencer.count') do
      post :create, influencer: { description: @influencer.description, is_especial: @influencer.is_especial, name: @influencer.name, video_url: @influencer.video_url }
    end

    assert_redirected_to influencer_path(assigns(:influencer))
  end

  test "should show influencer" do
    get :show, id: @influencer
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @influencer
    assert_response :success
  end

  test "should update influencer" do
    patch :update, id: @influencer, influencer: { description: @influencer.description, is_especial: @influencer.is_especial, name: @influencer.name, video_url: @influencer.video_url }
    assert_redirected_to influencer_path(assigns(:influencer))
  end

  test "should destroy influencer" do
    assert_difference('Influencer.count', -1) do
      delete :destroy, id: @influencer
    end

    assert_redirected_to influencers_path
  end
end

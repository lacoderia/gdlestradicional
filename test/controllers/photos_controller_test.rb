require 'test_helper'

class PhotosControllerTest < ActionController::TestCase
  setup do
    @photo = photos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:photos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create photo" do
    assert_difference('Photo.count') do
      post :create, photo: { active: @photo.active, author_id: @photo.author_id, author_nickname: @photo.author_nickname, caption: @photo.caption, instagram_id: @photo.instagram_id, lat: @photo.lat, location_id: @photo.location_id, long: @photo.long, points: @photo.points, tags: @photo.tags, url_low: @photo.url_low, url_normal: @photo.url_normal, url_thumb: @photo.url_thumb }
    end

    assert_redirected_to photo_path(assigns(:photo))
  end

  test "should show photo" do
    get :show, id: @photo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @photo
    assert_response :success
  end

  test "should update photo" do
    patch :update, id: @photo, photo: { active: @photo.active, author_id: @photo.author_id, author_nickname: @photo.author_nickname, caption: @photo.caption, instagram_id: @photo.instagram_id, lat: @photo.lat, location_id: @photo.location_id, long: @photo.long, points: @photo.points, tags: @photo.tags, url_low: @photo.url_low, url_normal: @photo.url_normal, url_thumb: @photo.url_thumb }
    assert_redirected_to photo_path(assigns(:photo))
  end

  test "should destroy photo" do
    assert_difference('Photo.count', -1) do
      delete :destroy, id: @photo
    end

    assert_redirected_to photos_path
  end
end

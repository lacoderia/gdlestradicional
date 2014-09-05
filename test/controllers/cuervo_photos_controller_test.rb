require 'test_helper'

class CuervoPhotosControllerTest < ActionController::TestCase
  setup do
    @cuervo_photo = cuervo_photos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cuervo_photos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cuervo_photo" do
    assert_difference('CuervoPhoto.count') do
      post :create, cuervo_photo: { active: @cuervo_photo.active, description: @cuervo_photo.description, gallery_id: @cuervo_photo.gallery_id, name: @cuervo_photo.name }
    end

    assert_redirected_to cuervo_photo_path(assigns(:cuervo_photo))
  end

  test "should show cuervo_photo" do
    get :show, id: @cuervo_photo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cuervo_photo
    assert_response :success
  end

  test "should update cuervo_photo" do
    patch :update, id: @cuervo_photo, cuervo_photo: { active: @cuervo_photo.active, description: @cuervo_photo.description, gallery_id: @cuervo_photo.gallery_id, name: @cuervo_photo.name }
    assert_redirected_to cuervo_photo_path(assigns(:cuervo_photo))
  end

  test "should destroy cuervo_photo" do
    assert_difference('CuervoPhoto.count', -1) do
      delete :destroy, id: @cuervo_photo
    end

    assert_redirected_to cuervo_photos_path
  end
end

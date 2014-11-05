class AddPointsAndPictureCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :points, :integer
    add_column :users, :picture_count, :integer
  end
end

class AddConstraintToPhotos < ActiveRecord::Migration
  def change
		add_index :photos, [:instagram_id], :unique => true
  end
end

class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :instagram_id
      t.text :caption
      t.string :author_id
      t.string :author_nickname
      t.float :lat
      t.float :long
      t.integer :location_id
      t.string :url_low
      t.string :url_thumb
      t.string :url_normal
      t.integer :points, default: 0
      t.boolean :active, default: true

      t.timestamps
    end
  end
end

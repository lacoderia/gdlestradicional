class CreateCuervoPhotos < ActiveRecord::Migration
  def change
    create_table :cuervo_photos do |t|
      t.integer :gallery_id
      t.string :name
      t.text :description
      t.boolean :active

      t.timestamps
    end
  end
end

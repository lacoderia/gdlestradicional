class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.text :description
      t.float :lat
      t.float :long
      t.integer :route_id
      t.boolean :active, default: true

      t.timestamps
    end
  end
end

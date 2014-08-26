class CreateUtils < ActiveRecord::Migration
  def change
    create_table :utils do |t|
      t.string :next_min_id

      t.timestamps
    end
  end
end

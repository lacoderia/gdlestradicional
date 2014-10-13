class CreateIlluminations < ActiveRecord::Migration
  def change
    create_table :illuminations do |t|
      t.boolean :active

      t.timestamps
    end
  end
end

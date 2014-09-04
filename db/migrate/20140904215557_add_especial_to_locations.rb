class AddEspecialToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :especial, :boolean, :default => false
  end
end

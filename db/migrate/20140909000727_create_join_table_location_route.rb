class CreateJoinTableLocationRoute < ActiveRecord::Migration
  create_table :locations_routes, id: false do |t|
    t.belongs_to :location
    t.belongs_to :route
  end
end

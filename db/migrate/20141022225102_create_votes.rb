class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.string :name
      t.string :email
      t.text :answer
      t.integer :route_id
      t.boolean :subscribe
      t.boolean :isUser

      t.timestamps
    end
  end
end

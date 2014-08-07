class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :uid
      t.string :name
      t.string :nickname,           null: false, default: ""
      t.string :access_token,       null: false, default: ""
      t.string :picture
      t.boolean :active

      t.timestamps
    end

    add_index :users, :nickname,                unique: true
  end
end

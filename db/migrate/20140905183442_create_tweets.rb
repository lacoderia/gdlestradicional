class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :author
      t.string :text
      t.float :lat
      t.float :long
      t.boolean :active, :default => true
      t.boolean :featured, :default => true

      t.timestamps
    end
  end
end

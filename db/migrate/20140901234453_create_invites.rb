class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :user_id
      t.string :ip_address

      t.timestamps
    end

    add_index(:invites, [:user_id, :ip_address], :unique => true)
  end
end

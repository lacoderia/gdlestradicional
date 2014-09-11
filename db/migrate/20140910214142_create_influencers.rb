class CreateInfluencers < ActiveRecord::Migration
  def change
    create_table :influencers do |t|
      t.string :name
      t.text :description
      t.boolean :is_especial, default: false
      t.string :video_url

      t.timestamps
    end
  end
end

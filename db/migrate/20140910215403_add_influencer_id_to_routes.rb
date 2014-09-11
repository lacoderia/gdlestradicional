class AddInfluencerIdToRoutes < ActiveRecord::Migration
  def change
  	add_column :routes, :influencer_id, :integer
  end
end

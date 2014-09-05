class AddAttachmentAvatarToCuervoPhotos < ActiveRecord::Migration
  def self.up
    change_table :cuervo_photos do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :cuervo_photos, :avatar
  end
end

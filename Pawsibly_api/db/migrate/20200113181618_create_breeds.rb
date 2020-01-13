class CreateBreeds < ActiveRecord::Migration[6.0]
  def change
    create_table :breeds do |t|
      t.string :names, array: true, default: []
      t.string :user_id

      t.timestamps
    end
  end
end

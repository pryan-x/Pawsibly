class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :age_bottom
      t.string :age_top
      t.string :gender
      t.string :location_range

      t.timestamps
    end
  end
end

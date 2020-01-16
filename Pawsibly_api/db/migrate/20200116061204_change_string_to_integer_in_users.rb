class ChangeStringToIntegerInUsers < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :location_range, 'integer USING CAST(location_range AS integer)'
  end
end
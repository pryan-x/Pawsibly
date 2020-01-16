class ChangeStringToArrayInUsers < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :gender, "varchar[] USING (string_to_array(gender, ','))"
  end
end

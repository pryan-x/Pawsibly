class ChangeStringToIntegerBreeds < ActiveRecord::Migration[6.0]
  def change
    change_column :breeds, :user_id, 'integer USING CAST(user_id AS integer)'
  end
end

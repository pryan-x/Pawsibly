class RemoveColumnFromBreeds < ActiveRecord::Migration[6.0]
  def change
    remove_column :breeds, :names
  end
end

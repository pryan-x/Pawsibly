class RenameColumnBreeds < ActiveRecord::Migration[6.0]
  def change
    rename_column :breeds, :breedList, :breed_list
  end
end

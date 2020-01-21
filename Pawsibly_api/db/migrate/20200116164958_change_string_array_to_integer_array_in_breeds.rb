class ChangeStringArrayToIntegerArrayInBreeds < ActiveRecord::Migration[6.0]
  def change
    add_column :breeds, :breedList, :integer, array: true, default: []
  end
end
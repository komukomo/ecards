class AddSupToCards < ActiveRecord::Migration[5.0]
  def change
    add_column :cards, :front_sup, :text
    add_column :cards, :back_sup, :text
  end
end

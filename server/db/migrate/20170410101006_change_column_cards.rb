class ChangeColumnCards < ActiveRecord::Migration[5.0]
  def change
    change_column_null :cards, :front, false
    change_column_null :cards, :back, false
    change_column_null :cards, :level, false
    change_column_null :cards, :learntime, false
    change_column_default :cards, :level, 0
    add_index :cards, :learntime
  end
end

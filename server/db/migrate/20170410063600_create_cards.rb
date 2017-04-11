class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :front
      t.string :back
      t.integer :level
      t.datetime :learntime

      t.timestamps
    end
  end
end

class CreateSupervisors < ActiveRecord::Migration[6.0]
  def change
    create_table :supervisors do |t|
      t.string :firstName
      t.string :lastName
      t.integer :phoneNum
      t.string :email
      t.string :city
      t.string :country
      t.references :contractor, null: false, foreign_key: true
      t.references :contract, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class CreateContractors < ActiveRecord::Migration[6.0]
  def change
    create_table :contractors do |t|
      t.string :firstName
      t.string :lastName
      t.integer :phoneNum
      t.string :email
      t.string :companyName
      t.string :city
      t.string :country
      
      t.timestamps
    end
  end
end

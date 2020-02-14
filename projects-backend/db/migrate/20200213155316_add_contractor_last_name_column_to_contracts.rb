class AddContractorLastNameColumnToContracts < ActiveRecord::Migration[6.0]
  def change
    add_column :contracts, :contractor_lastName, :string
  end
end

class Supervisor < ApplicationRecord
  belongs_to :contractor
  belongs_to :contract
end

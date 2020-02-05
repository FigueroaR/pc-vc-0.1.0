class SupervisorSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :phoneNum, :email, :city, :country
  has_one :contractor
  has_one :contract
end

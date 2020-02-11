class ContractorSerializer < ActiveModel::Serializer
  attributes :id, 
  :firstName, 
  :lastName, 
  :phoneNum,
  :email,
  :companyName,
  :city,
  :country
end

class ContractorSerializer < ActiveModel::Serializer
  attributes :id, 
  :firsName, 
  :lastName, 
  :phoneNum,
  :email,
  :companyName,
  :city,
  :country
end

class ContractSerializer < ActiveModel::Serializer
  attributes :id, 
  :projectName, 
  :projectStreet, 
  :projectCity, 
  :projectCountry, 
  :projectBudget, 
  :projectBeginDate, 
  :projectEndDate, 
  :projectType, 
  :projectInformation, 
  :projectStaff, 
  :projectCompleted, 
  :monthsEstimated, 
  :monthsCurrent, 
  :monthsOverDue
end

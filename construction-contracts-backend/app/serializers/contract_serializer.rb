class ContractSerializer < ActiveModel::Serializer
  attributes :id, 
  :projectName, 
  :projectStreet, 
  :projectCity, 
  :projectCountry, 
  :projectBudget, 
  :projectBegginDate, 
  :projectEndDate, 
  :projectType, 
  :projectInformation, 
  :projectStaff, 
  :projectCompleted, 
  :monthsEstimated, 
  :monthsCurrent, 
  :monthsOverDue
end

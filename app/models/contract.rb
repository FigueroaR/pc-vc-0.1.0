class Contract < ApplicationRecord
    belongs_to :contractor


    validates :projectName, presence: :true
    validates :projectStreet, presence: :true
    validates :projectCity, presence: :true 
    validates :projectCountry, presence: :true 
    validates :projectBudget, presence: :true 
    validates :projectBeginDate, presence: :true 
    validates :projectEndDate,  presence: :true
    validates :projectType, presence: :true 
    validates :projectInformation, presence: :true 
    validates :projectStaff,  presence: :true
    validates :monthsEstimated, presence: :true 
    validates :monthsCurrent, presence: :true 
    validates :monthsOverDue,  presence: :true
end

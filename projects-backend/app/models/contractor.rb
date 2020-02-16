class Contractor < ActiveRecord::Base
    has_many :contracts

    validates :firstName, presence: :true
    validates :lastName, presence: :true
    validates :phoneNum, presence: :true
    validates :email, presence: :true
    validates :companyName, presence: :true
    validates :city, presence: :true
    validates :country, presence: :true
end

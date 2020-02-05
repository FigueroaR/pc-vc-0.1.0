Contractor has many supervisors ------contractor.supervisors
           has many contracts thriugh supervisors  ----contractor.supervisor.contracts

supervisor belongs to contract -------supervisor.contract
           belongs to contractor -----supervisor.contractor

contract one supervisor       ------contract.supervisor
         has one contractor through supervisor ----contract.contractor


table contractor do 
    firstName
    lastName
    phoneNum
    email
    companyName
    city
    country 
end

table supervisor 
        firstName
        lastName
        phoneNum
        email
        city
        country 
        contractor:references
        contract:references 

table contract 
        projectName
        projectStreet
        projectCity
        projectCountry
        projectBudget
        projectBegginDate
        projectEndDate
        projectType --hospital? beidge?
        projectInformation -- 250,000sm^2 hospital
        projectStaff: integer 
        projectCompleted: boolean 
        monthsEstimated
        monthsCurrent
        monthsOverDue




         





# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

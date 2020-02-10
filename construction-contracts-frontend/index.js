const BASE_URL = "http://localhost:3000"

window.addEventListener('DOMContentLoaded', (event) => {
    showContractors()
    //console.log('DOM fully loaded and parsed');
});

function allProjects(){
    clearForm();
    let main = document.getElementById("main-form")
    fetch("http://localhost:3000/contracts")
    .then(resp => resp.json())
    .then(projects => {
        main.innerHTML+= projects.map(project =>  `
        <li><a href="#" data-id="${project.id}">${project.projectName}</a> 
        <button data-id=${project.id} class="delete" onclick="removeProject(${project.id})"; return false;>Delete</button>
        <button data-id=${project.id} class="edit" onclick="editProject(${project.id})"; return false;>Edit</button>
        </li>
        `).join('')
    })

}

function removeProject(id){

    fetch(BASE_URL + `/contracts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

}



function assignProject(e){
    clearForm();
    let main = document.getElementById("main-form")
    let html = `
    <form onsubmit="createContract();return false;">
    <label>Project Name:</label>
    <input type="text" id="Project Name"></br>
    <label>Project Street:</label>
    <input type="text" id="Project Street"></br>
    <label>Project City:</label>
    <input type="text" id="Project City"></br>
    <label>Project Country:</label>
    <input type="text" id="Project Country"></br>
    <label>Budget:</label>
    <input type="number" id="Budget"></br>
    <label>Begin Date:</label>
    <input type="date" id="Begin Date"></br>
    <label>End Date:</label>
    <input type="date" id="End Date"></br>
    <label>Project Type:</label>
    <input type="text" id="Project Type"></br>
    <label>Project Information:</label>
    <input type="text" id="Project Information"></br>
    <label>Months Estimated:</label>
    <input type="number" id="Months Estimated"></br>
    <label>Months Current:</label>
    <input type="number" id="Months Current"></br>
    <label>Months Overdue:</label>
    <input type="number" id="Months Overdue"></br>
    <label>Staff Total:</label>
    <input type="number" id="Staff Total"></br>

    <label>Contractor has hidden field Id:</label>
    <input type="hidden" id="contractorID" value="${e}" data-id="${e}"> </br>
    
    <label>Complete:</label>
    <input type ="checkbox" id="Project Completed"></br>
    <input type ="submit" value="Create Project Contract">
`
    main.innerHTML = html
}

function createContract(){
    contract = {
        projectName: document.getElementById("Project Name").value,
        projectStreet: document.getElementById("Project Street").value,
        projectCity: document.getElementById("Project City").value, 
        projectCountry: document.getElementById("Project Country").value,
        projectBudget: document.getElementById("Budget").value,
        projectBeginDate: document.getElementById("Begin Date").value, 
        projectEndDate: document.getElementById("End Date").value, 
        projectType: document.getElementById("Project Type").value, 
        projectInformation: document.getElementById("Project Information").value, 
        projectStaff: document.getElementById("Staff Total").value,
        projectCompleted: document.getElementById("Project Completed").value,
        monthsEstimated: document.getElementById("Months Estimated").value, 
        monthsCurrent: document.getElementById("Months Current").value, 
        monthsOverDue: document.getElementById("Months Overdue").value,
        contractor_id: document.getElementById("contractorID").value
    }

    fetch("http://localhost:3000/contracts", {
        method: "POST",
        body: JSON.stringify(contract),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}





function removeContractor(id){
    //console.log("e", e)
    clearForm();
    fetch(`http://localhost:3000/contractors/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

function editContractor(e){
    clearForm();
    console.log(e)
}

function showContractors(){
    //console.log("i think its working")
    clearForm();
    let main = document.getElementById("main-form")
    fetch("http://localhost:3000/contractors")
    .then(resp => resp.json())
    .then(contractors => {
        main.innerHTML+= contractors.map(contractor =>  `
        <h2>Contractors</h2>
        <li><a href="#" data-id="${contractor.id}">${contractor.lastName}</a> 
        <button data-id=${contractor.id} class="delete" onclick="removeContractor(${contractor.id})"; return false;>Delete</button>
        <button data-id=${contractor.id} class="edit" onclick="editContractor(${contractor.id})"; return false;>Edit</button>
        <button data-id=${contractor.id} class="contract" onclick="assignProject(${contractor.id})"; return false;>Assign project</button>
        </li>
        `).join('')
    })
    
}

function displayContractorForms() {
    clearForm();
    let main = document.getElementById("main-form")
    
    let html = `
        <form onsubmit="createContractor();return false;">
        <label>First Name:</label>
        <input type ="text" id="First Name"></br>
        <label>Last Name:</label>
        <input type ="text" id="Last Name"></br>
        <label>Phone Num:</label>
        <input type ="text" id="Phone Num"></br>
        <label>email:</label>
        <input type ="text" id="email"></br>
        <label>Company Name:</label>
        <input type ="text" id="Company Name"></br>
        <label>City:</label>
        <input type ="text" id="City"></br>
        <label>Country:</label>
        <input type ="text" id="Country"></br>
        <input type ="submit" value="Create Contractor">
    `
    main.innerHTML = html
}

function createContractor(){
    user = {
        firstName: document.getElementById("First Name").value,
        lastName: document.getElementById("Last Name").value,
        phoneNum: document.getElementById("Phone Num").value,
        email: document.getElementById("email").value,
        companyName: document.getElementById("Company Name").value,
        city: document.getElementById("City").value,
        country: document.getElementById("Country").value
    }

    fetch(BASE_URL+'/contractors',{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}



function clearForm(){
   let main = document.getElementById("main-form")
   main.innerHTML = ""
}






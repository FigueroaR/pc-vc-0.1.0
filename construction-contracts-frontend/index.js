const BASE_URL = `localhost:3000`


window.addEventListener('DOMDocumentLoaded', () => {
    showContractors();
    //showContracts();
    contractorForms();
    attachClickToContractors()
})

function attachClickToContractors(){
    let deleteContractor = document.querySelectorAll("button.delete")
        deleteContractor.forEach( one => {
            one.addEventListener("click", (e) => {
                removeContractor(e)
            })
        })

    let editContractor = document.querySelectorAll("button.edit")
        editContractor.forEach( one => {
            one.addEventListener("click", (e) => {
                editContractor(e)
            })
        })

    let newContract = document.querySelectorAll("button.contract")
        newContract.forEach( one => {
            one.addEventListener("click", (e) => {
                assignProject(e)
            })
        })
}

function removeContractor(e){
    clearForm();
    console.log(e)
    
}

function editContractor(e){
    clearForm();
    console.log(e)
}

function assignProject(e){
    clearForm();
    console.log(e)
    let main = document.getElementById("main-form")
    let html = `
    <form onsubmit="createContract();return false;">
    <label>Project Name:</label>
    <input type ="text" id="Project Name"></br>
    <label>Project Street:</label>
    <input type ="text" id="Project Street"></br>
    <label>Project City:</label>
    <input type ="text" id="Project City"></br>
    <label>Budget:</label>
    <input type ="text" id="Budget"></br>
    <label>Beggin Date:</label>
    <input type ="date" id="Beggin Date"></br>
    <label>End Date:</label>
    <input type ="date" id="End Date"></br>
    <label>Project Type:</label>
    <input type ="text" id="Project Type"></br>
    <label>Project Information:</label>
    <input type ="text" id="Project Information"></br>
    <label>Months Estimated:</label>
    <input type ="number" id="Months Estimated"></br>
    <label>Months Current:</label>
    <input type ="number" id="Months Current"></br>
    <label>Months Overdue:</label>
    <input type ="number" id="Staff Total"></br>
    <label>Contractor has hidden field Id:</label>
    <input type="hidden" id="${e}"></br>
    
    <label>Compete:</label>
    <input type ="checkbox" id="Prject Completed"></br>
    <input type ="submit" value="Create Contractor">
`
    main.innerHTML = html
}

function showContractors(){
    //console.log("i think its working")
    clearForm();
    let main = document.getElementById("main-form")
    fetch("http://localhost:3000/contractors")
    .then(resp => resp.json())
    .then(contractors => {
        main.innerHTML+= contractors.map(contractor =>  `
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
        <label>Compete:</label>
        <input type ="checkbox" id="completed"></br>
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
    .then(resp => resp.json())
    .then(person => {
        document.getElementById("main-form").innerHTML += `
        <li><a href="#" data-id="${person.id}">${person.lastName}</a>
         - ${person.completed ? "Completed" : "Not Completed"}
         <button data-id=${person.id} onclick="removeContractor(${person.id})"; return false;>Delete</button>
         <button data-id=${person.id} onclick="editContractor(${person.id})"; return false;>Edit</button>
         <button data-id=${person.id} onclick="assignProject(${person.id})"; return false;>Assign Project</button>
         </li>
        `
        
    })
}



function clearForm(){
   let main = document.getElementById("main-form")
   main.innerHTML = ""
}






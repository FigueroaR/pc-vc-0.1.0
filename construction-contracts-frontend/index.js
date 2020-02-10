const BASE_URL = `localhost:3000`


window.addEventListener('DOMDocumentLoaded', () => {
    showContractors();
    //showContracts();
    contractorForms();
})
// function attachClickToContractors(){
//     let deleteContractor = document.querySelectorAll("button.delete")
//         deleteContractor.addEventListener("click", (e) => {
//             console.log(e)
//         })

//     let editContractor = document.querySelectorAll("button.edit")
//         editContractor.forEach( one => {
//             one.addEventListener("click", (e) => {
//                 console.log(e)
//             })
        
//         })

//     let newContract = document.querySelectorAll("button.contract")
//         newContract.addEventListener("click", (e) => {
//             console.log(e)
//         })
// }

function showContractors(){
    //console.log("i think its working")
    clearForm();
    let main = document.getElementById("main-form")
    fetch("http://localhost:3000/contractors")
    .then(resp => resp.json())
    .then(contractors => {
        main.innerHTML+= contractors.map(contractor =>  `
        <li><a href="#" data-id="${contractor.id}">${contractor.lastName}</a> 
        <button data-id=${contractor.id} class="delete" onclick="removeTodo(${contractor.id})"; return false;>Delete</button>
        <button data-id=${contractor.id} class="edit" onclick="editTodo(${contractor.id})"; return false;>Edit</button>
        <button data-id=${contractor.id} class="contract" onclick="assignProject(${contractor.id})"; return false;>Assign project</button>
        </li>
        `).join('')

        attachClickToContractors()
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
        attachClickToTodoLinks()
        clearForm()
    })
}



function clearForm(){
   let main = document.getElementById("main-form")
   main.innerHTML = ""
}






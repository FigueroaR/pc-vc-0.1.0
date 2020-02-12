class Contractor{
    constructor(firstName, lastName, phoneNum, email, companyName,
        city, country){
            this.firstName = firstName,
            this.lastName = lastName,
            this.phoneNum = phoneNum, 
            this.email = email,
            this.companyName = companyName,
            this.city = city,
            this.country = country
    };
}

///////////Contractor//////////////////////////
function showContractors(){
    //console.log("i think its working")
    clearForm();
    document.getElementById("main").innerHTML = ""
    let main = document.getElementById("main")
    main.innerHTML = "<h2>Contractors</h2>"
    fetch("http://localhost:3000/contractors")
    .then(resp => resp.json())
    .then(contractors => {
        main.innerHTML+= contractors.map(contractor =>  `
        <li><a href="#" data-id="${contractor.id}">${contractor.lastName}</a> 
        <button data-id=${contractor.id} class="delete" >Delete</button>
        <button data-id=${contractor.id} class="edit" >Edit</button>
        <button data-id=${contractor.id} class="contract" >Assign project</button>
        `).join('');

        let newContract = document.querySelectorAll("button.contract")
            newContract.forEach( assignProjectButton => {
                assignProjectButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    //console.log(e.currentTarget.dataset.id)
                    assignProject(e)
                })
        })

        let edit = document.querySelectorAll("button.edit")
            edit.forEach( editButton => {
                editButton.addEventListener("click", (e) => {
                    //console.log(e.currentTarget.dataset.id)
                    e.preventDefault()
                    editContractor(e)
                })
        })
        
        let deleteContractor = document.querySelectorAll("button.delete")
            deleteContractor.forEach( deleteButton => {
                deleteButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    //console.log(e.currentTarget.dataset.id)
                    removeContractor(e)
            })
        })

        let projectsByContractor = document.querySelectorAll("a")
            projectsByContractor.forEach(contractor => {
                contractor.addEventListener("click", (e) => {
                    e.preventDefault();
                    contractorProjects(e.currentTarget.dataset.id)
                })
        }) 
    })  
}

function displayContractorForms(e) {
    clearForm();
    e.preventDefault();
    let main = document.getElementById("main-form")
    
    let html = `
        <form class="createContractor">
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
        </form>
    `
    main.innerHTML = html
    let executeContractor = document.querySelector("form.createContractor")
    executeContractor.addEventListener("submit", createContractor)

}
function createContractor(){
    
    let newContractor = new Contractor(document.getElementById("First Name").value, 
    document.getElementById("Last Name").value, 
    document.getElementById("Phone Num").value, 
    document.getElementById("email").value, 
    document.getElementById("Company Name").value, 
    document.getElementById("City").value, 
    document.getElementById("Country").value)

    let main = document.getElementById("main")
    fetch(BASE_URL+'/contractors',{
        method: "POST",
        body: JSON.stringify(newContractor),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(contractor => {
        main.innerHTML+= `
        <li><a href="#" data-id="${contractor.id}">${contractor.lastName}</a> 
        <button data-id=${contractor.id} class="delete" >Delete</button>
        <button data-id=${contractor.id} class="edit" >Edit</button>
        <button data-id=${contractor.id} class="contract">Assign project</button>
        </li>
        `
    })
}


function editContractor(e){
    //clearForm();
    e.preventDefault()
    console.log(e)
    fetch(`http://localhost:3000/contractors/${e.currentTarget.dataset.id}`) 
    .then(resp => resp.json())
    .then(contractor => {
        let main = document.getElementById("main-form")
    
        let html = `
            <form>
            <label>First Name: </label>
            <input type ="text" id="First Name" value="${contractor.firstName}"></br>
            <label>Last Name:</label>
            <input type ="text" id="Last Name" value="${contractor.lastName}"></br>
            <label>Phone Num:</label>
            <input type ="text" id="Phone Num" value="${contractor.phoneNum}"></br>
            <label>email:</label>
            <input type ="text" id="email" value="${contractor.email}"></br>
            <label>Company Name:</label>
            <input type ="text" id="Company Name" value="${contractor.companyName}"></br>
            <label>City:</label>
            <input type ="text" id="City"value="${contractor.city}"></br>
            <label>Country:</label>
            <input type ="text" id="Country" value="${contractor.country}"></br>
            <input type ="submit" class="editContractor" value="Edit Contractor" data-id="${contractor.id}">
            `
            main.innerHTML = html
            e.preventDefault()

            let editThisContractor = document.querySelector("input.editContractor")
            editThisContractor.addEventListener("click", (e) => {
                updateContractor(e) 
            })
    })
}

function updateContractor(e){
    let newContractor = new Contractor(document.getElementById("First Name").value, 
    document.getElementById("Last Name").value, 
    document.getElementById("Phone Num").value, 
    document.getElementById("email").value, 
    document.getElementById("Company Name").value, 
    document.getElementById("City").value, 
    document.getElementById("Country").value)

    fetch(BASE_URL+`/contractors/${e.currentTarget.dataset.id}`,{
        method: "PATCH",
        body: JSON.stringify(newContractor),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then( contractor => {
        document.getElementsByTagName(`a[${e.currentTarget.dataset.id}]`).innerHTML = `
        <li><a href="#" data-id="${contractor.id}">${contractor.lastName}</a> 
        <button data-id=${contractor.id} class="delete"; return false;>Delete</button>
        <button data-id=${contractor.id} class="edit" ; return false;>Edit</button>
        <button data-id=${contractor.id} class="contract" ; return false;>Assign project</button>
        </li>
        `
        clearForm();
        showContractors();
    })
}

function removeContractor(e){
    e.preventDefault();
    //console.log("e", e)
    fetch(`http://localhost:3000/contractors/${e.currentTarget.dataset.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then( e.currentTarget.parentElement.remove())


    
}

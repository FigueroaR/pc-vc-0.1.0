const BASE_URL = "http://localhost:3000"
window.addEventListener('load', () => {
    
    showContractors()
    //console.log('DOM fully loaded and parsed');
    headerEventListeners();
    clearForm();

});
///////////Listeners///////
function headerEventListeners(){

        document.getElementById("links").innerHTML += `<ul>
        <button class="allContractors" >All contractors</button> 
        <button class="displayContractorForm" > New Contractor</button>
        <button class="allProject" > All projects</button>
        </ul> 
        `
    ///onclick="allProjects()"; onclick="showContractors()";
    let contractors = document.querySelector("button.allContractors")
        contractors.addEventListener("click",showContractors)

    let displayContractForm = document.querySelector("button.displayContractorForm")
        displayContractForm.addEventListener("click", (e) => {
            e.preventDefault();
            //console.log("e",e )
            displayContractorForms(e);
        })

    let projects = document.querySelector("button.allProject")
        projects.addEventListener("click", allProjects)
}


///////////Project//////////////////
function allProjects(){
    document.getElementById("main").innerHTML = ""
    clearForm();
    let main = document.getElementById("main-form")
    fetch("http://localhost:3000/contracts")
    .then(resp => resp.json())
    .then(projects => {
        main.innerHTML+= projects.map(project =>  `
        <li><a href="#" data-id="${project.id}">${project.projectName}</a> 
        | ${project.projectCompleted ? "Completed" : "Not Completed"} |
        <button data-id=${project.id} class="deleteThisContract" >Delete</button>
        <button data-id=${project.id} class="editThisContract" >Edit</button>
        </li>
        `).join(''); 

        let editproject = document.querySelectorAll("button.editThisContract")
            editproject.forEach( editContractButton => {
                editContractButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    //console.log(e.currentTarget.dataset.id)
                    editProject(e.currentTarget.dataset.id)
                    
                })
        })
        
        let deleteproject = document.querySelectorAll("button.deleteThisContract")
            deleteproject.forEach( deleteButton => {
                deleteButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    //console.log(e.currentTarget.dataset.id)
                    removeProject(e.currentTarget.dataset.id)
            })
        })

        let individualContracts = document.querySelectorAll("a")
            individualContracts.forEach( project => {
                project.addEventListener("click", (e) => {
                    e.preventDefault();
                    individualProject(e.currentTarget.dataset.id)
                })
        }) 
    })
}

function individualProject(id){
    clearForm();
    fetch(BASE_URL + `/contracts/${id}`)
    .then(resp => resp.json())
    .then(project => {
        let main = document.getElementById("main")
    
        let html = `
        <form>
        <label>Project Name:</label>
        <p>${project.projectName}</p></br>
        <label>Project Street:</label>
        <p>${project.projectStreet}</p></br>
        <label>Project City:</label>
        <p>${project.projectCity}</p></br>
        <label>Project Country:</label>
        <p>${project.projectCountry}</p></br>
        <label>Budget:</label>
        <p>${project.projectBudget}</p></br>
        <label>Begin Date:</label>
        <p>${project.projectBeginDate}</p></br>
        <label>End Date:</label>
        <p>${project.projectEndDate}</p></br>
        <label>Project Type:</label>
        <p>${project.projectType}</p></br>
        <label>Project Information:</label>
        <p>${project.projectInformation}</p></br>
        <label>Months Estimated:</label>
        <p>${project.monthsEstimated}</p></br>
        <label>Months Current:</label>
        <p>${project.monthsCurrent}</p></br>
        <label>Months Overdue:</label>
        <p>${project.monthsOverDue}</p></br>
        <label>Staff Total:</label>
        <p>${project.projectStaff}</p></br>
        <label>Contractor ID:</label>
        <p>${project.contractor_id}</p></br>
        <label>Complete:</label>
        <p>${project.projectCompleted ? "Completed" : "Not Completed"}</p></br>
        `
        main.innerHTML = html
    })
        
}

function assignProject(e){
    //clearForm();
    e.preventDefault();
    let main = document.getElementById("main-form")
    let html = `
    <form class="createProjectContract">
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
    <input type="hidden" id="contractorID" value=${e.currentTarget.dataset.id} data-id=${e.currentTarget.dataset.id}> </br>
    
    <label>Complete:</label>
    <input type ="checkbox" id="Project Completed"></br>
    <input type ="submit" value="Create Project Contract">
    </form>
    `
    main.innerHTML = html
    let executeContractor = document.querySelector("form.createProjectContract")
    executeContractor.addEventListener("submit", createContract)
}

function createContract(){
    let newContract = new Contract(
    document.getElementById("Project Name").value , 
    document.getElementById("Project Street").value, 
    document.getElementById("Project City").value, 
    document.getElementById("Project Country").value,
    document.getElementById("Budget").value, 
    document.getElementById("Begin Date").value, 
    document.getElementById("End Date").value, 
    document.getElementById("Project Type").value,
    document.getElementById("Project Information").value, 
    document.getElementById("Staff Total").value, 
    document.getElementById("Project Completed").checked, 
    document.getElementById("Months Estimated").value, 
    document.getElementById("Months Current").value, 
    document.getElementById("Months Overdue").value, 
    document.getElementById("contractorID").value
    )
    
    fetch("http://localhost:3000/contracts", {
        method: "POST",
        body: JSON.stringify(newContract),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(projects => {
        main.innerHTML+= projects.map(project =>  `
        <li><a href="#" data-id="${project.id}">${project.projectName}</a> 
        ${project.projectCompleted ? "Completed" : "Not Completed"}
        <button data-id=${project.id} class="delete" onclick="removeProject(${project.id})"; return false;>Delete</button>
        <button data-id=${project.id} class="edit" onclick="editProject(${project.id})"; return false;>Edit</button>
        </li>
        `).join('')
    })
    
}

function editProject(id){
    fetch(BASE_URL + `/contracts/${id}`)
    .then(resp => resp.json())
    .then(project => {
        let main = document.getElementById("main-form")
    
        let html = `
        <form>
        <label>Project Name:</label>
        <input type="text" id="Project Name" value="${project.projectName}"></br>
        <label>Project Street:</label>
        <input type="text" id="Project Street" value="${project.projectStreet}"></br>
        <label>Project City:</label>
        <input type="text" id="Project City" value="${project.projectCity}"></br>
        <label>Project Country:</label>
        <input type="text" id="Project Country" value="${project.projectCountry}"></br>
        <label>Budget:</label>
        <input type="number" id="Budget" value="${project.projectBudget}"></br>
        <label>Begin Date:</label>
        <input type="date" id="Begin Date" value="${project.projectBeginDate.split("T")[0]}"></br>
        <label>End Date:</label>
        <input type="date" id="End Date" value="${project.projectEndDate.split("T")[0]}"></br>
        <label>Project Type:</label>
        <input type="text" id="Project Type" value="${project.projectType}"></br>
        <label>Project Information:</label>
        <input type="text" id="Project Information" value="${project.projectInformation}"></br>
        <label>Months Estimated:</label>
        <input type="number" id="Months Estimated" value="${project.monthsEstimated}"></br>
        <label>Months Current:</label>
        <input type="number" id="Months Current" value="${project.monthsCurrent}"></br>
        <label>Months Overdue:</label>
        <input type="number" id="Months Overdue" value="${project.monthsOverDue}"></br>
        <label>Staff Total:</label>
        <input type="number" id="Staff Total" value="${project.projectStaff}"></br>
        <label>Contractor has hidden field Id:</label>
        <input type="hidden" id="contractorID" value="${project.contractor_id}" data-id="${project.contractor_id}"> </br>
        
        <label>Complete:</label>
        <input type ="checkbox" id="Project Completed" value="${project.projectCompleted}"></br>
        <input type ="submit" value="Edit Project Contract" class="editProjectContract"data-id="${project.id}">
        `
        main.innerHTML = html;
        let editThisContractor = document.querySelector("input.editProjectContract")
        editThisContractor.addEventListener("click", (e) => {
            updateContract(e.currentTarget.dataset.id) 
        }) 
    })
}

function updateContract(e){
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
        projectCompleted: document.getElementById("Project Completed").checked,
        monthsEstimated: document.getElementById("Months Estimated").value, 
        monthsCurrent: document.getElementById("Months Current").value, 
        monthsOverDue: document.getElementById("Months Overdue").value,
        contractor_id: document.getElementById("contractorID").value
    }
    fetch(`http://localhost:3000/contracts/${e}`, {
        method: "PATCH",
        body: JSON.stringify(contract),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(project => {
        document.getElementsByTagName(`a[${e}]`).innerHTML =  `
        <li><a href="#" data-id="${project.id}">${project.projectName}</a> 
        <button data-id=${project.id} class="delete" onclick="removeProject(${project.id})"; return false;>Delete</button>
        <button data-id=${project.id} class="edit" onclick="editProject(${project.id})"; return false;>Edit</button>
        </li>
        `
    })
    clearForm()
}

function removeProject(id){
    
    fetch(BASE_URL + `/contracts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .them(allProjects)
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

    let main = document.getElementById("main")

    let newContractor = new Contractor(document.getElementById("First Name").value, document.getElementById("Last Name").value, document.getElementById("Phone Num").value, document.getElementById("email").value, document.getElementById("Company Name").value, document.getElementById("City").value, document.getElementById("Country").value)

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
    user = {
        firstName: document.getElementById("First Name").value,
        lastName: document.getElementById("Last Name").value,
        phoneNum: document.getElementById("Phone Num").value,
        email: document.getElementById("email").value,
        companyName: document.getElementById("Company Name").value,
        city: document.getElementById("City").value,
        country: document.getElementById("Country").value
    }
    fetch(BASE_URL+`/contractors/${e.currentTarget.dataset.id}`,{
        method: "PATCH",
        body: JSON.stringify(user),
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
    })
}

function removeContractor(e){
    e.preventDefault();
    //console.log("e", e)
    clearForm();
    fetch(`http://localhost:3000/contractors/${e.currentTarget.dataset.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(showContractors);
}


/////////contractor-projecs///////////
function contractorProjects(e){
    //console.log(e.currentTarget.dataset.id)
    document.getElementById("main").innerHTML = ""
    clearForm();
    let main = document.getElementById("main")
    fetch(BASE_URL + "/contracts")
    .then(resp => resp.json())
    .then(projects => {
    let projectsFiltered = projects.filter( project => {
    let projectcontractorid = project.contractor_id.toString()
    let contractorid = e
    return projectcontractorid.match(contractorid)
    })
    main.innerHTML += projectsFiltered.map( project =>  `
        <li><a href="#" data-id="${project.id}">${project.projectName}</a> 
        | ${project.projectCompleted ? "Completed" : "Not Completed"} |
        <button data-id=${project.id} class="deleteThisContract" >Delete</button>
        <button data-id=${project.id} class="editThisContract" >Edit</button>
        </li>
        `).join(''); 

        let editproject = document.querySelectorAll("button.editThisContract")
            editproject.forEach( editContractButton => {
                editContractButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    //console.log(e.currentTarget.dataset.id)
                    editProject(e.currentTarget.dataset.id)
                    
                })
        })
        
        let deleteproject = document.querySelectorAll("button.deleteThisContract")
            deleteproject.forEach( deleteButton => {
                deleteButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    //console.log(e.currentTarget.dataset.id)
                    removeProject(e.currentTarget.dataset.id)
            })
        })
            
        let individualContracts = document.querySelectorAll("a")
        individualContracts.forEach( project => {
            project.addEventListener("click", (e) => {
                e.preventDefault();
                individualProject(e.currentTarget.dataset.id)
            })
        }) 
    })
}



///////Clear Forum///////
function clearForm(){
    let main = document.getElementById("main-form")
    main.innerHTML = ""
}
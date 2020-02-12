class Contract {
    constructor(projectName, 
        projectStreet, 
        projectCity,
        projectCountry, 
        projectBudget, 
        projectBeginDate, 
        projectEndDate, 
        projectType, 
        projectInformation, 
        projectStaff, 
        projectCompleted, 
        monthsEstimated, 
        monthsCurrent, 
        monthsOverDue, 
        contractor_id){
            this.projectName = projectName,
            this.projectStreet = projectStreet,
            this.projectCity = projectCity,
            this.projectCountry = projectCountry,
            this.projectBudget = projectBudget,
            this.projectBeginDate = projectBeginDate,
            this.projectEndDate = projectEndDate,
            this.projectType = projectType,
            this.projectInformation = projectInformation,
            this.projectStaff = projectStaff,
            this.projectCompleted = projectCompleted,
            this.monthsEstimated = monthsEstimated,
            this.monthsCurrent = monthsCurrent,
            this.monthsOverDue = monthsOverDue,
            this.contractor_id = contractor_id
    }
}

///////////Project//////////////////
function allProjects(){
    
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
                    removeProject(e)
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
    clearForm();
}

function editProject(id){
    clearForm();
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

    fetch(`http://localhost:3000/contracts/${e}`, {
        method: "PATCH",
        body: JSON.stringify(newContract),
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
        clearForm();
        allProjects();
    })
    
}

function removeProject(e){
    clearForm();
    fetch(BASE_URL + `/contracts/${e.currentTarget.dataset.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then( e.currentTarget.parentElement.remove())
}



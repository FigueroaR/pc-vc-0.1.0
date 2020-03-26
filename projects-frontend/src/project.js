// const BASE_URL = "https://localhost:3000"

class Project {
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
        contractor_id,
        contractor_lastName){
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
            this.contractor_id = contractor_id,
            this.contractor_lastName = contractor_lastName
    }
}

///////////Project//////////////////

function allProjects(){
    document.getElementById("main").innerHTML = ""
    clearForm();
    let main = document.getElementById("main")
    fetch(BASE_URL + "/contracts")
    .then(resp => resp.json())
    .then(projects => {
        main.innerHTML+= projects.map(project =>  ` 
        <li> Project: <a href="#" data-id="${project.id}"> ${project.projectName}</a> 
        | By:
        <button data-id=${project.contractor_id} class="show" onclick="showContractor(${project.contractor_id})"; return false;>${project.contractor_lastName}</button> | ${project.projectCompleted ? "Completed" : "Not Completed"} |
        <button data-id=${project.id} class="delete" onclick="removeProject(${project.id})"; return false;>Delete</button>
        <button data-id=${project.id} class="edit" onclick="editProject(${project.id})"; return false;>Edit</button>
        </li>
        `).join(''); 

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
    document.getElementById("main").innerHTML = ""
    clearForm();
    let main = document.getElementById("main")
    
    fetch(BASE_URL + `/contracts/${id}`)
    .then(resp => resp.json())
    .then(project => {
        
        let html = `
        <h3>Project Name:</h3>
        <p>${project.projectName}</p></br>
        <h3>Project Street:</h3>
        <p>${project.projectStreet}</p></br>
        <h3>Project City:</h3>
        <p>${project.projectCity}</p></br>
        <h3>Project Country:</h3>
        <p>${project.projectCountry}</p></br>
        <h3>Budget:</h3>
        <p>${project.projectBudget}</p></br>
        <h3>Begin Date:</h3>
        <p>${project.projectBeginDate.split("T")[0]}</p></br>
        <h3>End Date:</h3>
        <p>${project.projectEndDate.split("T")[0]}</p></br>
        <h3>Project Type:</h3>
        <p>${project.projectType}</p></br>
        <h3>Project Information:</h3>
        <p>${project.projectInformation}</p></br>
        <h3>Months Estimated:</h3>
        <p>${project.monthsEstimated}</p></br>
        <h3>Months Current:</h3>
        <p>${project.monthsCurrent}</p></br>
        <h3>Months Overdue:</h3>
        <p>${project.monthsOverDue}</p></br>
        <h3>Staff Total:</h3>
        <p>${project.projectStaff}</p></br>
        <h3>Contractor ID:</h3>
        <p>${project.contractor_id}</p></br>
        <h3>Contractor lastName:</h3>
        <p> <a href='#' data-id=${project.contractor_id}> ${project.contractor_lastName} </a></p></br>
        <h3>Complete:</h3>
        <p>${project.projectCompleted ? "Completed" : "Not Completed"}</p></br>
        `
        main.innerHTML = html
        document.querySelector('a').addEventListener( 'click', (e) => {
            showContractor(e.currentTarget.dataset.id);
            e.preventDefault()
        })
    })
        
}

function assignProject(e){
    //clearForm();
    
    let main = document.getElementById("main-form")
    let html = `
    <form class="createProjectContract" >
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
    <input type="hidden" id="contractorID" value=${e.currentTarget.dataset.id} data-id=${e.currentTarget.dataset.id}>
    <input type="hidden" id="contractorlastName" value=${e.currentTarget.dataset.lastname} data-id=${e.currentTarget.dataset.lastname}>
    <label>Complete:</label>
    <input type ="checkbox" id="Project Completed"></br>
    <input type ="submit" value="Create Project" class="createProject">
    </form>
    `
    main.innerHTML = html
    let executeProject = document.querySelector("input.createProject")
    executeProject.addEventListener("click", (e) => {
        createProject() 
        allProjects()
        e.preventDefault()
        
    } )
    
}

function createProject(){
    let newproject = new Project(
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
    document.getElementById("contractorID").value,
    document.getElementById("contractorlastName").value
    )
    
    fetch( BASE_URL + "/contracts", {
        method: "POST",
        body: JSON.stringify(newproject),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    // .then(resp => resp.json())
    // .then(project => {
    //     main.innerHTML +=  `
    //     <li> Project: <a href="#" data-id="${project.id}"> ${project.projectName}</a> 
    //     | ${project.projectCompleted ? "Completed" : "Not Completed"} |
    //     <button data-id=${project.id} class="delete" onclick="removeProject(${project.id})"; return false;>Delete</button>
    //     <button data-id=${project.id} class="edit" onclick="editProject(${project.id})"; return false;>Edit</button>
    //     </li>
    //     `
    // })
    clearForm();
    document.getElementById("main").innerHTML = ""
    
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
        <input type="number" id="Staff Total" value="${project.projectStaff}"></br>git 
        <input type="hidden" id="contractorID" value="${project.contractor_id}" data-id="${project.contractor_id}"> </br>
        <label>Complete:</label>
        <input type ="checkbox" id="Project Completed" value="${project.projectCompleted}"></br>
        <input type ="submit" value="Edit Project" class="editThisProject" data-id="${project.id}">
        </form>
        `
        main.innerHTML = html;
        let editThisContract = document.querySelector("input.editThisProject")
        editThisContract.addEventListener("click", (e) => {
            updateProject(e.currentTarget.dataset.id) 
            e.preventDefault();
        }) 
    })
}

function updateProject(id){
    let newProject = new Project(
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

    fetch( BASE_URL + `/contracts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newProject),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(project => {
        
        let tag = document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement
        
        tag.innerHTML = `
        Project: <a href="#" data-id="${project.id}"> ${project.projectName}</a> 
        | ${project.projectCompleted ? "Completed" : "Not Completed"} |
        <button data-id=${project.id} class="delete" onclick="removeProject(${project.id})"; return false;>Delete</button>
        <button data-id=${project.id} class="edit" onclick="editProject(${project.id})"; return false;>Edit</button>
        `
        let individualContracts = document.querySelectorAll("a")
            individualContracts.forEach( project => {
                project.addEventListener("click", (e) => {
                    e.preventDefault();
                    individualProject(e.currentTarget.dataset.id)
                })
            }) 

        clearForm();
        // document.getElementById("main").innerHTML = ""
        // allProjects();
    })
    
}

function removeProject(id){
    //let id = e.currentTarget.dataset.id
    fetch(BASE_URL + `/contracts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.remove())   
}



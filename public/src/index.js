// const BASE_URL = "http://localhost:3000"
const BASE_URL = "http://czaqlvgdhkxexq:603d859661b72d0b92ce8c24b9781db02864f4e47b0693860c3055c88b4a808d@ec2-3-211-48-92.compute-1.amazonaws.com:5432/d8lfsnlsa0p6n1"
window.addEventListener('load', () => {
    
    showContractors()
    //console.log('DOM fully loaded and parsed');
    headerEventListeners();
    console.log("Welcome To Project Central")
});

///////////Listeners///////
function headerEventListeners(){

        document.getElementById("links").innerHTML += `<ul>
        <button class="allContractors" >All contractors</button> 
        <button class="displayContractorForm" > New Contractor</button>
        <button class="allprojects" > All projects</button>
        </ul> 
        `
    ///onclick="allProjects()"; onclick="showContractors()";
    let contractors = document.querySelector("button.allContractors")
        contractors.addEventListener("click",showContractors)

    let displayContractForm = document.querySelector("button.displayContractorForm")
        displayContractForm.addEventListener("click", displayContractorForms)

    let projects = document.querySelector("button.allprojects")
        projects.addEventListener("click", allProjects)
}



/////////contractor-projecs///////////
function contractorProjects(e){
    //console.log(e.currentTarget.dataset.id)
    clearForm();
    document.getElementById("main").innerHTML = ""
    let main = document.getElementById("main")
    fetch("/contracts")
    .then(resp => resp.json())
    .then(projects => {
        let projectsFiltered = projects.filter( project => {
            let projectcontractorid = project.contractor_id.toString()
            let contractorid = e
            return projectcontractorid.match(contractorid)
    })
    main.innerHTML += projectsFiltered.map( project =>  `
        <li> Project: <a href="#" data-id="${project.id}"> ${project.projectName}</a> 
        | ${project.projectCompleted ? "Completed" : "Not Completed"} |
        <button data-id=${project.id} class="deleteThisContract" >Delete</button>
        <button data-id=${project.id} class="editThisContract" >Edit</button>
        </li>
        `).join(''); 

        let editproject = document.querySelectorAll("button.editThisContract")
            editproject.forEach( editContractButton => {
                editContractButton.addEventListener("click", (e) => {
                    //console.log(e.currentTarget.dataset.id)
                    e.preventDefault()
                    editProject(e.currentTarget.dataset.id)
                    
                    
                })
            })
        
        let deleteproject = document.querySelectorAll("button.deleteThisContract")
            deleteproject.forEach( deleteButton => {
                deleteButton.addEventListener("click", (e) => {
                    removeProject(e)
                    e.preventDefault();
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
    let form = document.getElementById("main-form")
    form.innerHTML = ""

}
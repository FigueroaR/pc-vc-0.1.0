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
    fetch("http://localhost:3000/contractors")
    .then(resp => resp.json())
    .then(contractors => {
        contractors.sort((a, b) => (a.lastName.slice(0,2).toLocaleUpperCase()) > (b.lastName.slice(0,2).toLocaleUpperCase()) ? 1 : -1)
        // contractors.sort((a, b) => (a.lastName.charAt(1).toLocaleUpperCase()) > (b.lastName.charAt(1).toLocaleUpperCase()) ? 1 : -1)
        //standarizing data

        main.innerHTML+= contractors.map( contractor =>  `
        <li><a href="#" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}</a>
        <button data-id=${contractor.id} class="show" onclick="showContractor(${contractor.id})"; return false;>Profile</button>
        <button data-lastname=${contractor.lastName} data-id=${contractor.id} class="contract" >Assign project</button>
        <button data-id=${contractor.id} class="edit" onclick="editContractor(${contractor.id})"; return false;>Edit</button>
        <button data-id=${contractor.id} class="delete" onclick="removeContractor(${contractor.id})"; return false;>Delete</button></li> 
        
        
        `).join('');

        let newContract = document.querySelectorAll("button.contract")
            newContract.forEach( assignProjectButton => {
                assignProjectButton.addEventListener("click", (e) => {
                    //console.log(e.currentTarget.dataset.id)
                    assignProject(e)
                    e.preventDefault()
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

function showContractor(id){
    clearForm();
    document.getElementById("main").innerHTML = ""
    let main = document.getElementById("main")
    fetch(BASE_URL + `/contractors/${id}`)
    .then( resp => resp.json())
    .then(contractor => {

        let html = `
        <h3>First Name:</h3>
        <p> ${contractor.firstName}</p></br>
        <h3>Last Name:</h3>
        <p> ${contractor.lastName}</p></br>
        <h3>Phone Num:</h3>
        <p>${contractor.phoneNum} </p></br>
        <h3>email:</h3>
        <p>${contractor.email} </p></br>
        <h3>Company Name:</h3>
        <p> ${contractor.companyName}</p></br>
        <h3>City:</h3>
        <p>${contractor.city} </p></br>
        <h3>Country:</h3>
        <p>${contractor.country} </p></br>
        `
        main.innerHTML = html
    })



}

function displayContractorForms(e) {
    document.getElementById("main").innerHTML = ""
    showContractors();
    let main = document.getElementById("main-form")
    
    let html = `
        <form >
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
        <input type ="submit" value="Create Contractor" class="createContractor">
        </form>
        <br><br>
    `
    main.innerHTML = html
    let executeContractor = document.querySelector("input.createContractor")
    executeContractor.addEventListener("click", (e) => {
        createContractor();
        e.preventDefault()        
    })

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
        <li><a href="#" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}</a>
        <button data-id=${contractor.id} class="show" onclick="showContractor(${contractor.id})"; return false;>Profile</button>
        <button data-lastname=${contractor.lastName} data-id=${contractor.id} class="contract" >Assign project</button>
        <button data-id=${contractor.id} class="edit" onclick="editContractor(${contractor.id})"; return false;>Edit</button>
        <button data-id=${contractor.id} class="delete" onclick="removeContractor(${contractor.id})"; return false;>Delete</button></li>
        `
        let newContract = document.querySelectorAll("button.contract")
            newContract.forEach( assignProjectButton => {
                assignProjectButton.addEventListener("click", (e) => {
                    //console.log(e.currentTarget.dataset.id)
                    assignProject(e)
                    e.preventDefault()
                })
        })

        let projectsByContractor = document.querySelectorAll("a")
            projectsByContractor.forEach(contractor => {
                contractor.addEventListener("click", (e) => {
                    e.preventDefault();
                    contractorProjects(e.currentTarget.dataset.id)
                })
        }) 

        clearForm();
    })
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        console.log(error.message);
    })
    
}


function editContractor(id){    
    fetch(`http://localhost:3000/contractors/${id}`) 
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
            </form>
                <br><br>
            `
            main.innerHTML = html

            let editThisContractor = document.querySelector("input.editContractor")
            editThisContractor.addEventListener("click", (e) => {
                updateContractor(e.currentTarget.dataset.id) 
                e.preventDefault();
            })
    })
}

function updateContractor(id){
    let newContractor = new Contractor(document.getElementById("First Name").value, 
    document.getElementById("Last Name").value, 
    document.getElementById("Phone Num").value, 
    document.getElementById("email").value, 
    document.getElementById("Company Name").value, 
    document.getElementById("City").value, 
    document.getElementById("Country").value)

    fetch(BASE_URL+`/contractors/${id}`,{
        method: "PATCH",
        body: JSON.stringify(newContractor),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then( contractor => {
        let tag = document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement
        tag.innerHTML = `
        <a href="#" data-lastname="${contractor.lastName}" data-id="${contractor.id}">${contractor.lastName}</a>
        <button data-id=${contractor.id} class="show" onclick="showContractor(${contractor.id})"; return false;>Profile</button>
        <button data-lastname=${contractor.lastName} data-id=${contractor.id} class="contract" >Assign project</button>
        <button data-id=${contractor.id} class="edit" onclick="editContractor(${contractor.id})"; return false;>Edit</button>
        <button data-id=${contractor.id} class="delete" onclick="removeContractor(${contractor.id})"; return false;>Delete</button>
        `
        let newContract = document.querySelectorAll("button.contract")
            newContract.forEach( assignProjectButton => {
                assignProjectButton.addEventListener("click", (e) => {
                    //console.log(e.currentTarget.dataset.id)
                    assignProject(e)
                    e.preventDefault()
                })
        })

        let projectsByContractor = document.querySelectorAll("a")
            projectsByContractor.forEach(contractor => {
                contractor.addEventListener("click", (e) => {
                    e.preventDefault();
                    contractorProjects(e.currentTarget.dataset.id)
                })
        }) 

        clearForm();
        // document.getElementById("main").innerHTML = ""
        // showContractors();
    })
}

function removeContractor(id){
    //console.log("e", e)
    fetch(`http://localhost:3000/contractors/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(document.querySelectorAll(`li a[data-id="${id}"]`)[0].parentElement.remove())

}

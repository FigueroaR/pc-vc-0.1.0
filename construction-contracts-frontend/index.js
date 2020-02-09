const BASE_URL = "http://localhost:3000"


window.addEventListener('DOMDocumentLoaded', () => {
    //showContractors();
    //showContracts();
    contractorForms();
})

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
    
}

function clearForm(){
   let main = document.getElementById("main-form")
   main.innerHTML = ""
}


// function showContractors(){
//     console.log("i think its working")
//     clearForm()
//     //main.innerHtml = ""
//     fetch(BASE_URL+'/contractors')
//     .then(resp => resp.json())
//     .then(contractors => {
//         main.innerHTML += contractors.map(c `
//         <li><a href="#" data-id="${contractor.id}">${contractor.Firstname}</a></li>`).join('')
//     })
    
// }



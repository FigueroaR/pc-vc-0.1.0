const BASE_URL = "http://localhost:3000"


window.addEventListener('load', () => {
    showContractors();
    //showContracts();
    //attatchEventlisteners();
})

function showContractors(){
    console.log("i think its working")
    clearForm()
    main.innerHtml = ""
    fetch(BASE_URL+'/contractors')
    .then(resp => resp.json())
    .then(contractors => {
        main.innerHTML+= contractors.map(contractor => `
        <li><a href="#" data-id="${contractor.id}">${contractor.name}</a></li>`).join('')
    })
    
}

function clearForm(){
    let todoFormDiv = document.getElementById("main-form")
    let main = document.querySelector('#main')
    main.innerHTML = ""

}
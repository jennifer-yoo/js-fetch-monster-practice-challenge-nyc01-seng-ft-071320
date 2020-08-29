document.addEventListener('DOMContentLoaded', function() {

    const baseUrl = "http://localhost:3000/monsters"
    const getMonsters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(monsters => iterateMonsters(monsters))
    }

    // const iterateMonsters = monsterInput(num=50) => {
    //     for (const monster of monsterInput.slice(0, num)) {
    //         (renderMonster(monster)) 
    //     }
    // }

    function iterateMonsters(monsterInput, start=0, end=50) {
        for (const monster of monsterInput.slice(start, end)) {
            (renderMonster(monster)) 
        }        
    }

    function renderMonster(oneMonst) {
        const monsterBox = document.getElementById("monster-container")
        const monsterUl = document.createElement("ul")

        let name = oneMonst.name
        let age = oneMonst.age
        let description = oneMonst.description

        monsterUl.id = oneMonst.id

        //console.log(`${oneMonst.id}`)
        monsterUl.insertAdjacentHTML("beforeend", `
            <li>${name}</li>
            <li>${age}</li>
            <li>${description}</li>`)
        monsterBox.append(monsterUl)
    }

    function createForm() {
        const formBox = document.getElementById("create-monster")
        let formHead = document.createElement("h3")
        formHead.innerText = "Create a Monster"

        let form = document.createElement("form")
        form.id = "form"

        let inputName = document.createElement("input")
        inputName.setAttribute("placeholder", "name")
        inputName.id = "name"

        let inputAge = document.createElement("input")
        inputAge.setAttribute("placeholder", "age")
        inputAge.id = "age"

        let inputDesc = document.createElement("input")
        inputDesc.setAttribute("placeholder", "description")
        inputDesc.id = "description"

        let submit = document.createElement("button")
        submit.innerText = "Submit"

        formBox.append(formHead)
        formBox.append(form)
        form.append(inputName)
        form.append(inputAge)
        form.append(inputDesc)
        form.append(submit)
    } 

    function submitHandler() {
        //grab form ID for Event Listener
        const form = document.getElementById("form")
        
        form.addEventListener('submit', function(e) {
            //should go in the beginning
            e.preventDefault()

            const name = form.name.value
            const age = form.age.value
            const desc = form.description.value

            // create a new obj to send to POST
            const newObj = {
                name: name,
                age: age,
                desc: desc
            }

            // reset form 
            form.reset()

            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(newObj)
            }

            fetch(baseUrl, options)
            .then(response => response.json())
            //.then(renderMonster(newObj)) -- you do not need this because you are not rendering to page
            .catch(error => {
                console.log("There has been an error")
            })
        })
    }

    //set default argument to one, if user clicks back or forward. page# will increase/decrease
    function browseMonsters(page=1) {
        document.addEventListener("click", function(e){
            if ((e.target.id === "back") ) {
                page = page - 1
                fetch('http://localhost:3000/monsters/?_limit=50&_page=' + page)
                .then(response => response.json())
                .then(monsters => iterateMonsters(monsters))
                removeMons();
            } else if (e.target.id === "forward") {
                page = page + 1
                    fetch('http://localhost:3000/monsters/?_limit=50&_page=' + page)
                    .then(response => response.json())
                    .then(monsters => iterateMonsters(monsters))
                removeMons();
            }
        })
    }

    //removes extra li's from rendered page
    function removeMons(){
        const monCollection = document.getElementById('monster-container')
        while (monCollection.firstChild){
            monCollection.removeChild(monCollection.firstChild)
        }
    }

   getMonsters();
   createForm();
   submitHandler();
   browseMonsters();
})
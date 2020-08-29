document.addEventListener('DOMContentLoaded', function() {

    const getMonsters = () => {
        fetch("http://localhost:3000/monsters")
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
        document.addEventListener("click", function(e){
            if (e.target.id === "back") {
                newStart = start - 50
                newEnd = end - 50
                for (const monster of monsterInput.slice(newStart, newEnd)) {
                    (renderMonster(monster))
                }
            } else if (e.target.id === "forward") {
                newStart = start + 50
                newEnd = end + 50
                for (const monster of monsterInput.slice(newStart, newEnd)) {
                    (renderMonster(monster))
                }
            }
        })
        
    }

    function renderMonster(oneMonst) {
        const monsterBox = document.getElementById("monster-container")
        const monsterUl = document.createElement("ul")

        let name = oneMonst.name
        let age = oneMonst.age
        let description = oneMonst.description

        monsterUl.id = oneMonst.id

        console.log(`${oneMonst.id}`)
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
        // form.setAttribute("method", "post")
        // form.setAttribute("action", "submit.php")
        
        let inputName = document.createElement("input")
        inputName.setAttribute("type", "text")
        inputName.setAttribute("value", "")
        inputName.setAttribute("placeholder", "name")
        inputName.id = "name"

        let inputAge = document.createElement("input")
        inputAge.setAttribute("type", "number")
        inputAge.setAttribute("value", "")
        inputAge.setAttribute("placeholder", "age")
        inputAge.id = "age"

        let inputDesc = document.createElement("input")
        inputDesc.setAttribute("type", "text")
        inputDesc.setAttribute("value", "")
        inputDesc.setAttribute("placeholder", "description")
        inputDesc.id = "description"

        let submit = document.createElement("button")
        submit.setAttribute("type", "submit")
        submit.setAttribute("value", "Submit")
        submit.innerText = "Submit"
        submit.className = "submit-monster"

        formBox.append(formHead)
        formBox.append(form)
        form.append(inputName)
        form.append(inputAge)
        form.append(inputDesc)
        form.append(submit)
    } 

    function submitHandler() {
        const form = document.querySelector('form')
        document.addEventListener('submit', function(e) {
            console.log(e.target)
            // const name = form.name.value
            // const age = form.age.value
            // const desc = form.description.value

            // e.preventDefault()
            // e.reset()
       // })
        })
    }

    // function browseMonsters(monsterInput, num) {
    //     document.addEventListener("click", function(e){
    //         if (e.target.id === "back") {
    //             newNum = num - 50
    //             iterateMonsters(monsterInput, newNum);
    //         } else if (e.target.id === "forward") {
    //             newNum = num + 50
    //             iterateMonsters(monsterInput, newNum);
    //         }
    //     })
    // }

   getMonsters();
   createForm();
   submitHandler();
   //browseMonsters();
})
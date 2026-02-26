//Theme changes due to users interaction
const darkBtn = document.getElementById("darkBtn");
const lightBtn = document.getElementById("lightBtn");

darkBtn.addEventListener("click", () =>{
    document.body.classList.add("darkTheme")
})

lightBtn.addEventListener("click", () =>{
    document.body.classList.remove("darkTheme")
})

//Add task to to-do list
const toDoForm = document.getElementById("toDoForm");
const task = document.getElementById("task");
const toDoList = document.getElementById("toDoList");

toDoForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    if(task.value === "")return;

    const toDo = document.createElement("li");
    toDo.innerText = task.value + " ";
    
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️"
    doneBtn.addEventListener("click", () =>{
        toDo.classList.add("doneList")
    })

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️"
    removeBtn.addEventListener("click", () => toDo.remove());

    toDo.append(doneBtn);
    toDo.append(removeBtn);
    toDoList.append(toDo);
    
    toDoForm.reset();
})
//theme-switcher
const darkBtn = document.getElementById("darkBtn");
const lightBtn = document.getElementById("lightBtn");

darkBtn.addEventListener("click", () =>{
    document.body.classList.add("darkTheme");
    localStorage.setItem("theme", "dark");
})

lightBtn.addEventListener("click", () =>{
    document.body.classList.remove("darkTheme");
    localStorage.setItem("theme", "light");
})

//load saved theme on page load
function loadTheme(){
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark"){
        document.body.classList.add("darkTheme");
    }
}
loadTheme();

//select elements for to-do list
const toDoForm = document.getElementById("toDoForm");
const task = document.getElementById("task");
const toDoList = document.getElementById("toDoList");

//save tasks to local storage
function saveTasks(){
    const tasks = [];
    document.querySelectorAll(".taskItem").forEach(item => {
        tasks.push({
            text: item.querySelector("span").textContent,
            done: item.querySelector("span").classList.contains("doneList")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load tasks from local storage
function loadTasks(){
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];

    saved.forEach(taskObj => {
        createTaskItem(taskObj.text, taskObj.done);
    });
}
loadTasks();

//create a task item
function createTaskItem(text, isDone = false){
    const toDo = document.createElement("li");
    toDo.classList.add("taskItem");

    const textSpan = document.createElement("span");
    textSpan.textContent = text;

    if(isDone){
        textSpan.classList.add("doneList");
    }

    //add 'DONE' button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓"
    doneBtn.addEventListener("click", () =>{
        textSpan.classList.toggle("doneList");
        saveTasks();
    })

    //add 'REMOVE' Button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️"
    removeBtn.addEventListener("click", () =>{
        toDo.remove();
        saveTasks();
    });

    //group the 'DONE' and 'REMOVE' buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("buttonGroup");
    buttonGroup.append(doneBtn, removeBtn);

    //append the elements to the document
    toDo.append(textSpan, buttonGroup);
    toDoList.append(toDo);
}

//add submit event for new task
toDoForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    //prevent empty task
    if(task.value === "")return;

    //build new task using the form input
    createTaskItem(task.value);
    saveTasks();
    //clear input field
    toDoForm.reset();
})
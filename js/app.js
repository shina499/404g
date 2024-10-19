let $ = document;
const inputelem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListelem = $.getElementById("todoList");



let todosArray = []



function addNewTodo() {
    let newTodoTitle = inputelem.value

    let newTodoObj = {
        id:todosArray.length + 1,
        title:newTodoTitle,
        complete:false
    }

    inputelem.value = ""

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)

    inputelem.focus()
}

function setLocalStorage(todoslist) {
    localStorage.setItem("todos",JSON.stringify(todoslist))
}



function todosGenerator(todoslist) {

    let newTodoLiElem , newTodoLabelElem , newTodoCompleteBtn , newTodoDeleteBtn

    todoListelem.innerHTML = ""

    todoslist.forEach(todo => {
       
        newTodoLiElem = $.createElement("li")
        newTodoLiElem.className = "completed well"

        newTodoLabelElem = $.createElement("label")
        newTodoLabelElem.innerHTML = todo.title

        newTodoCompleteBtn = $.createElement("button")
        newTodoCompleteBtn.className = "btn btn-success"
        newTodoCompleteBtn.innerHTML = "complete"
        newTodoCompleteBtn.setAttribute("onclick",`editTodo(${todo.id})`)

        newTodoDeleteBtn = $.createElement("button")
        newTodoDeleteBtn.className = "btn btn-danger"
        newTodoDeleteBtn.innerHTML = "delete"
        newTodoDeleteBtn.setAttribute("onclick",`removeTodo(${todo.id})`)

        if (todo.complete) {
            newTodoLiElem.className = "uncompleted well"
            newTodoCompleteBtn.innerHTML = "uncomplete"
        }

        newTodoLiElem.append(newTodoLabelElem , newTodoCompleteBtn , newTodoDeleteBtn)

        todoListelem.append(newTodoLiElem)

    });
}







function editTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))

    todosArray = localStorageTodos

    todosArray.forEach(todo =>{
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todosArray)

    todosGenerator(todosArray)
}




function removeTodo(todoId) {

   let localStorageTodos = JSON.parse(localStorage.getItem("todos"))
   todosArray = localStorageTodos

   let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
   })

   todosArray.splice(mainTodoIndex,1)

   setLocalStorage(todosArray)

   todosGenerator(todosArray)
}




function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    }else{
        todosArray = []
    }

    todosGenerator(todosArray)

    console.log(localStorageTodos)
}

function clearTodo() {
    todosArray = []
    todosGenerator(todosArray)
    localStorage.removeItem("todos")
}

window.addEventListener("load" , getLocalStorage)

inputelem.addEventListener("keydown",function (event) {
    console.log(event)
    if (event.code === "Enter") {
        addNewTodo()
    }
})



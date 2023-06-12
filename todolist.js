// selectors :
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector("#todo-btn");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector(".filter-todos");
// eventListeners :
todoButton.addEventListener("click", todoAdd);
todoList.addEventListener("click", removeCheck);
filterTodos.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);
// function :
function todoAdd(e) {
  e.preventDefault();
  console.log(e);
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = ` <li>${todoInput.value}</li>
  <span><i class="fa fa-check-square"></i></span>
  <span></i> <i class="fa fa-trash"></i></span>`;
  todoDiv.innerHTML = newTodo;
  todoList.appendChild(todoDiv);
  savedLocalTodos(todoInput.value);
  todoInput.value = "";
}
function removeCheck(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  if (classList[1] === "fa-check-square") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("complated");
  } else if (classList[1] === "fa-trash") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}
function filterTodo(e) {
  console.log(todoList.childNodes);
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complated":
        if (todo.classList.contains("complated")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplated":
        if (!todo.classList.contains("complated")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function savedLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}
function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = ` <li>${todo}</li>
  <span><i class="fa fa-check-square"></i></span>
  <span></i> <i class="fa fa-trash"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}

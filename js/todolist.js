let todosRaw = localStorage.getItem('todos');
if (todosRaw == null) todosRaw = '[]';
let todos = JSON.parse(todosRaw);
const todolist = document.getElementById('todolist');

function saveTodos(todos) {
  let todosString = JSON.stringify(todos);
  localStorage.setItem('todos', todosString);
}

function removeTodos(deletedTodo) {
  const newTodos = [];
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    if (todo.name !== deletedTodo.name || todo.done !== deletedTodo.done) {
      newTodos.push(todo);
    }
  }
  todos = newTodos;
  saveTodos(newTodos);
  renderTodos();
}

function createTodoListItem(todo) {
  let label = document.createElement('label');
  label.className = 'checkbox-item';

  let spanItemName = document.createElement('span');
  spanItemName.className = 'item-name';
  spanItemName.innerHTML = todo.name;

  let inputCheckbox = document.createElement('input');
  if (todo.done) inputCheckbox.setAttribute('checked', 'checked');
  inputCheckbox.setAttribute('type', 'checkbox');

  let spanCheckmark = document.createElement('span');
  spanCheckmark.className = 'checkmark';

  let spanDelete = document.createElement('delete');
  spanDelete.innerHTML = 'x';
  spanDelete.addEventListener('click', function () {
    removeTodos(todo);
  });

  label.appendChild(spanItemName);
  label.appendChild(inputCheckbox);
  label.appendChild(spanCheckmark);
  label.appendChild(spanDelete);

  return label;
}

function renderTodos() {
  todolist.innerHTML = '';
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    let el = createTodoListItem(todo);
    todolist.appendChild(el);
  }
}

function addNewTodolistListener(e) {
  let todolistNew = document.getElementById('todolist-new');
  if (e.key === 'Enter' && todolistNew.value !== '') {
    let todolistNewValue = todolistNew.value;
    todos.push({
      name: todolistNewValue,
      done: false
    });
    renderTodos();
    saveTodos(todos);
    todolistNew.value = '';
  }
}

let todolistNew = document.getElementById('todolist-new');
todolistNew.addEventListener('keyup', addNewTodolistListener);

renderTodos();
todolistNew.focus();

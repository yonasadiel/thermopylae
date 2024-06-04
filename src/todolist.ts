interface Todo {
    name: string;
    done: boolean;
}

let todosRaw = localStorage.getItem('todos');
if (todosRaw == null) todosRaw = '[]';
let todos: Todo[] = JSON.parse(todosRaw);
const todolist = document.getElementById('todolist') as HTMLElement;

function saveTodos(todos: Todo[]): void {
    let todosString = JSON.stringify(todos);
    localStorage.setItem('todos', todosString);
}

function removeTodos(deletedTodo: Todo): void {
    const newTodos: Todo[] = [];
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

function createTodoListItem(todo: Todo): HTMLElement {
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

    let spanDelete = document.createElement('span');
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

function renderTodos(): void {
    if (!todolist) return;
    todolist.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let el = createTodoListItem(todo);
        todolist.appendChild(el);
    }
}

function addNewTodolistListener(e: KeyboardEvent): void {
    const todolistNew = document.getElementById('todolist-new') as HTMLInputElement;
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

export function initTodoList() {
    const todolistNew = document.getElementById('todolist-new') as HTMLInputElement;
    todolistNew.addEventListener('keyup', addNewTodolistListener);

    renderTodos();
    // todolistNew.focus();
}

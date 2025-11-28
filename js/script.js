let todos = [];

// Validate form input
function validateForm() {
    const task = document.getElementById('todo-input').value;
    const date = document.getElementById('date-input').value;

    if (task === '' || date === '') {
        alert('Please fill in both fields.');
        return;
    }

    addTodo(task, date);

    document.getElementById('todo-input').value = '';
    document.getElementById('date-input').value = '';
}

// Add new todo
function addTodo(task, date) {
    const todoItem = {
        task: task,
        date: date,
        completed: false,
    };

    todos.push(todoItem);
    renderTodos();
}

// Render todos to UI
function renderTodos(filterType = "all") {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    let filtered = todos;

    if (filterType === "completed") {
        filtered = todos.filter(t => t.completed === true);
    } else if (filterType === "uncompleted") {
        filtered = todos.filter(t => t.completed === false);
    }

    if (filtered.length === 0) {
        todoList.innerHTML = `<li>No todos available</li>`;
        return;
    }

    filtered.forEach((todo, index) => {
        todoList.innerHTML += `
        <li>
            <p style="font-size: 18px; ${todo.completed ? "text-decoration: line-through; color: gray;" : ""}">
                ${todo.task}
                <span style="font-size: 12px; color: gray;">(${todo.date})</span>
            </p>

            <div>
                <button onclick="toggleComplete(${index})">Complete</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        </li>`;
    });
}

// Toggle complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos(document.getElementById('filter-todo').value);
}

// Delete
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos(document.getElementById('filter-todo').value);
}

// Clear all
function clearTodos() {
    todos = [];
    renderTodos();
}

// Filter dropdown
function filterTodos() {
    const filterType = document.getElementById('filter-todo').value;
    renderTodos(filterType);
}


// EVENT LISTENERS

document.getElementById("todo-form").addEventListener("submit", function(e) {
    e.preventDefault();
    validateForm();
});

document.getElementById("filter-todo").addEventListener("change", filterTodos);

document.getElementById("clear-button").addEventListener("click", clearTodos);

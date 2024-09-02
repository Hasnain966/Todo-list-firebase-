// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeTzomnNKuNMd2CCViPKTmKiDb7xpYyjA",
    authDomain: "todo-app-9d99a.firebaseapp.com",
    databaseURL: "https://todo-app-9d99a-default-rtdb.firebaseio.com",
    projectId: "todo-app-9d99a",
    storageBucket: "todo-app-9d99a.appspot.com",
    messagingSenderId: "265252230295",
    appId: "1:265252230295:web:be239215ec42461ebd45d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Add Todo Function
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value;
    if (todoText.trim() !== "") {
        const newTodoRef = push(ref(database, 'todos'));
        set(newTodoRef, {
            text: todoText
        });
        todoInput.value = '';
    }
}

// Load Todos Function
function loadTodos() {
    const todoList = document.getElementById('todoList');
    const todosRef = ref(database, 'todos');
    onValue(todosRef, (snapshot) => {
        todoList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const todo = childSnapshot.val();
            const todoId = childSnapshot.key;
            const li = document.createElement('li');
            li.textContent = todo.text;

            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => deleteTodo(todoId);

            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    });
}

// Delete Todo Function
function deleteTodo(id) {
    const todoRef = ref(database, `todos/${id}`);
    remove(todoRef).then(() => {
        console.log('Todo deleted successfully!');
    }).catch((error) => {
        console.error('Error deleting todo:', error);
    });
}

// Expose functions to global scope
window.addTodo = addTodo;
window.loadTodos = loadTodos;

// Load todos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            // Add event listener to mark task as completed
            li.addEventListener('click', function() {
                tasks[index].completed = !tasks[index].completed;
                li.classList.toggle('completed');
                updateLocalStorage();
            });
            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent li click event from firing
                tasks.splice(index, 1);
                li.classList.add('deleted');
                setTimeout(function() {
                    renderTasks();
                    updateLocalStorage();
                }, 300);
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    // Add new task
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            renderTasks();
            updateLocalStorage();
            taskInput.value = '';
        }
    });

    // Update local storage with tasks
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial rendering of tasks
    renderTasks();
});

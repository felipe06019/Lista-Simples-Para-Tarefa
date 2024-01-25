document.addEventListener('DOMContentLoaded', function () {
    // Recupera a lista de tarefas do localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Adiciona as tarefas salvas à lista
    const taskList = document.getElementById('taskList');
    savedTasks.forEach(task => addTaskToDOM(task));

    // Adiciona uma nova tarefa
    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = { text: taskText, completed: false };
            savedTasks.push(newTask);

            // Atualiza o localStorage com a nova lista de tarefas
            localStorage.setItem('tasks', JSON.stringify(savedTasks));

            // Adiciona a nova tarefa à lista na página
            addTaskToDOM(newTask);

            // Limpa o campo de entrada
            taskInput.value = '';
        }
    };

    // Remove uma tarefa
    window.removeTask = function (index) {
        savedTasks.splice(index, 1);

        // Atualiza o localStorage com a nova lista de tarefas
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        // Remove a tarefa da lista na página
        const taskItem = document.getElementById(`taskItem${index}`);
        taskItem.parentNode.removeChild(taskItem);
    };

    // Marca uma tarefa como concluída
    window.toggleTask = function (index) {
        savedTasks[index].completed = !savedTasks[index].completed;

        // Atualiza o localStorage com a nova lista de tarefas
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        // Atualiza a aparência da tarefa na lista na página
        const taskItem = document.getElementById(`taskItem${index}`);
        taskItem.classList.toggle('completed');
    };

    // Função auxiliar para adicionar tarefa à lista na página
    function addTaskToDOM(task) {
        const taskItem = document.createElement('li');
        taskItem.id = `taskItem${savedTasks.indexOf(task)}`;
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(savedTasks.indexOf(task)));

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => removeTask(savedTasks.indexOf(task)));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(removeButton);

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    }
});

let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('task-counter');
// GET REQUEST
// function fetchTodo(){
//     fetch("https://jsonplaceholder.typicode.com/todos")
//     .then(function(response){
//         return response.json();
//     }).then(function(data){
//         tasks=data.slice(0,10);
//         renderList();
//     }).catch(function(error){
//         console.log('error',error);
//     })
// }

// GET REQUEST 
async function fetchTodo(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks=data.slice(0,10);
        renderList();
    }catch(error){
        console.log('error',error);
    }
    
}
function addTaskToDOM(task) {
    const li = document.createElement('li');
    console.log(task)
    li.innerHTML =`
        <div class="check-label">
            <input type = "checkbox" id = "${task.id}" ${ task.completed ? 'checked' : "" } class="custom-checkbox">
            <label for="${task.id}" id="label-${task.id}" >${task.title}</label>
        </div>
        <img src="del.jpg" class="delete" data-id="${task.id}" />
        `;
        if(!task.completed)
        {
            li.classList.remove('delete-todo');
        }
        if(task.completed){
            li.classList.add('delete-todo');
        }
    taskList.append(li);
}
function renderList() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    console.log(tasksCounter);
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id == taskId;
    });
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        let id = `label-${taskId}`
        let li = document.getElementById(id);
        if(!task.completed)
        {
            li.classList.remove('delete-todo');
        }
        if(task.completed){
            li.classList.add('delete-todo');
        }
        return;
    }
    console.log(task);
    showNotification('Could not toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id != taskId;
    })
    console.log(newTasks);
    tasks = newTasks;
    renderList();
    showNotification('Task deleted sucessfully');
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task has been sucessfully added');
        return;
    }
    showNotification('Task can bot be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    if (e.key == 'Enter') {
        const text = e.target.value;
        if (!text) {
            showNotification('Task text can not be empty !!!!');
            return;
        }
        const task = {
            title: text,
            id: Date.now().toString(),
            completed: false
        }
        e.target.value = '';
        addTask(task);
    }
}
function handleClickListner(e){
    const target = e.target;
    if(target.className=='delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className=='custom-checkbox'){
        const taskId= target.id;
        toggleTask(taskId);
        return;
    }

}
(function (){
    fetchTodo();
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click',handleClickListner);
})();

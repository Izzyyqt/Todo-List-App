//mga Variables ko para sa date and time
let dateElement = document.getElementById("current-date");
let dayElement = document.getElementById("current-day");
let timeElement = document.getElementById("current-time");
//mga Variables ko para sa tasks
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks from local storage
tasks.forEach(task => {
    addTaskToContainer(task);
});

//live date and time
setInterval(() => {
    let now = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    let formattedDate = now.toLocaleDateString('en-US', options);
    let dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    let time = now.toLocaleTimeString();

    dateElement.innerHTML = formattedDate;
    dayElement.innerHTML = dayOfWeek;
    timeElement.innerHTML = time;
}, 1000);

function addTask(){
    if(taskInput.value === ''){
        alert("You must write something! LMAO")
    } else {
        // Add task to tasks array
        tasks.push(taskInput.value);

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Log tasks to console for debugging
        console.log('Tasks:', tasks);

        // Display the task in the UI
        addTaskToContainer(taskInput.value);
    }
    taskInput.value = '';
}
function addTaskToContainer(taskText) {
    let li = document.createElement("li");
    li.innerHTML = taskText;
    taskContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "⋮";

    span.addEventListener("click", function() {
        // Check if the div is already present
        let existingDiv = li.querySelector("div");

        if (existingDiv) {
            // If the div is present, remove it
            existingDiv.remove();
        } else {
            // If the div is not present, create and append it
            let newDiv = document.createElement("div");

            // Create Edit button
            let editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", function() {
                // Handle Edit button click
                toggleEditMode(li, taskText);
            });

            // Create Delete button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {
                // Remove task from tasks array
                tasks = tasks.filter(task => task !== taskText);

                // Save updated tasks to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
                li.remove();
            });

            // Append buttons to the newDiv
            newDiv.appendChild(editButton);
            newDiv.appendChild(deleteButton);

            // Append newDiv to li
            li.appendChild(newDiv);
        }
    });

    li.appendChild(span);
    taskContainer.appendChild(li);
}

function toggleEditMode(li, taskText) {
    // Create an input field
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText;
    inputField.classList.add("edit-input");

    // Create a "Save" button
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", function() {
        // Update task text in the tasks array
        let updatedTaskText = inputField.value;

        // Check if the input is empty
        if (updatedTaskText.trim() === "") {
            alert("Type something!");  // Display alert if input is empty
            return;
        }

        tasks = tasks.map(task => (task === taskText ? updatedTaskText : task));

        // Save updated tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Replace the input field with the updated task text
        li.innerHTML = updatedTaskText;

        // Append the span element again for the dropdown
        let span = document.createElement("span");
        span.innerHTML = "⋮";
        span.addEventListener("click", function() {
            // Check if the div is already present
            let existingDiv = li.querySelector("div");

            if (existingDiv) {
                // If the div is present, remove it
                existingDiv.remove();
            } else {
                // If the div is not present, create and append it
                let newDiv = document.createElement("div");

                // Create Edit button
                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", function() {
                    // Handle Edit button click
                    toggleEditMode(li, updatedTaskText);
                });

                // Create Delete button
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function() {
                    // Remove task from tasks array
                    tasks = tasks.filter(task => task !== updatedTaskText);

                    // Save updated tasks to local storage
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    li.remove();
                });

                // Append buttons to the newDiv
                newDiv.appendChild(editButton);
                newDiv.appendChild(deleteButton);

                // Append newDiv to li
                li.appendChild(newDiv);
            }
        });

        // Append the span element
        li.appendChild(span);
        taskContainer.appendChild(li);
    });

    // Append the input field and "Save" button
    li.appendChild(inputField);
    li.appendChild(saveButton);
}
taskInput.value = '';

taskContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
}, false);

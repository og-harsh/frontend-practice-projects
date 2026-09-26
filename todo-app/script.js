// 1. DOM Elements Selectors
const saveBtn = document.querySelector("#save");
const searchInput = document.getElementById("search");
const listsContainer = document.querySelector(".lists");

// 2. State Management: Load data from Local Storage OR start with empty array
let data = JSON.parse(localStorage.getItem("rebuildTasks")) || [];

// 3. Initial Render
render(data);

// 4. Event Listeners
saveBtn.addEventListener("click", addTasks);
searchInput.addEventListener("input", handleSearch);

// --- CORE FUNCTIONS ---

function addTasks() {
    const dateInput = document.getElementById("date");
    const textInput = document.getElementById("text");
    const priorityInput = document.getElementById("priority");

    const dateVal = dateInput.value;
    const textVal = textInput.value.trim();
    const priorityVal = priorityInput.value;

    // Form Validation: Prevent empty tasks
    if (!textVal) {
        alert("System Alert: Task objective cannot be empty!");
        return;
    }
    if (!dateVal) {
        alert("System Alert: Please set a deadline date!");
        return;
    }

    // Create a new task object with a UNIQUE ID (Crucial for pro apps)
    const newTask = {
        id: Date.now(), 
        date: dateVal,
        task: textVal,
        priority: priorityVal,
        completed: false
    };

    data.push(newTask);
    saveData(); // Save to browser storage
    render(data); // Update UI

    // Clear input fields after saving
    textInput.value = "";
    dateInput.value = "";
}

// Function to save current state to Local Storage
function saveData() {
    localStorage.setItem("rebuildTasks", JSON.stringify(data));
}

// Render function handles displaying the UI based on the current data array
function render(taskArray) {
    // Sort tasks by date (Earliest first)
    taskArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Clear current list before re-rendering
    listsContainer.innerHTML = "";

    taskArray.forEach((item) => {
        // Task Container
        const div1 = document.createElement("div");
        div1.classList.add("list");
        if (item.completed) {
            div1.style.opacity = "0.5"; // Dim completed tasks visually
        }

        // Date Input
        const date1 = document.createElement("input");
        date1.type = "date";
        date1.readOnly = true;
        date1.value = item.date;

        // Text Input
        const text1 = document.createElement("input");
        text1.type = "text";
        text1.readOnly = true;
        text1.value = item.task;
        if (item.completed) text1.style.textDecoration = "line-through";

        // Priority Input
        const priority1 = document.createElement("input");
        priority1.type = "text";
        priority1.readOnly = true;
        priority1.value = item.priority;

        // Toggle Completion Logic
        const toggleComplete = () => {
            item.completed = !item.completed; // Flip the boolean
            saveData(); // Save the new state
            render(data); // Re-render to show strikethrough/dimming
        };
        text1.addEventListener("click", toggleComplete);
        priority1.addEventListener("click", toggleComplete);

        // Buttons
        const saveEditBtn = document.createElement("button");
        saveEditBtn.innerText = "Save";
        saveEditBtn.style.display = "none";

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        
        // Edit Mode Logic
        editBtn.addEventListener("click", () => {
            date1.readOnly = false;
            text1.readOnly = false;
            priority1.readOnly = false;
            text1.focus(); // Automatically put cursor in text field
            
            saveEditBtn.style.display = "block";
            editBtn.style.display = "none";
        });

        // Save Edited Task Logic
        saveEditBtn.addEventListener("click", () => {
            // Update the object in our data array
            item.date = date1.value;
            item.task = text1.value;
            item.priority = priority1.value;
            item.completed = false; // Reset completion status if edited

            saveData(); // Save to local storage
            render(data); // Re-render the whole list to exit edit mode cleanly
        });

        // Delete Logic (Using ID instead of Index - Much safer)
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            // Keep all tasks EXCEPT the one with this specific ID
            data = data.filter(t => t.id !== item.id);
            saveData();
            
            // Re-run the search filter if user is deleting while searching
            handleSearch(); 
        });

        // Assemble the DOM
        div1.append(date1, text1, priority1, saveEditBtn, editBtn, deleteBtn);
        listsContainer.appendChild(div1);
    });
}

// Search / Filter Logic
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    // Filter the global 'data' array based on the query
    const filtered = data.filter(item =>
        item.task.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query) ||
        item.priority.toLowerCase().includes(query)
    );
    
    // Render only the filtered results
    render(filtered);
}
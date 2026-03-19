let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let filter = "all";

function saveTasks(){
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

	let list = document.getElementById("taskList");

	list.innerHTML = "";

	let filteredTasks = tasks.filter(task =>{
		if(filter == "completed") return task.done;
		if(filter == "pending") return !task.done;
		return true;
	});

	filteredTasks.forEach((task, index) =>{

		let li = document.createElement("li");
		
		li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

		li.innerHTML =`
			<span onclick="toggleTask(${index})" class="cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}">
			${task.text}
			</span>

			<div class="flex gap-2">
			<button onclick="editTask(${index})" class="text-blue-500">Edit</button>
			<button onclick="deleteTask(${index})" class="text-red-500">Delete</button>
			</div>
		`;

		list.appendChild(li);
	});

	document.getElementById("taskCount").innerHTML = tasks.length;
	saveTasks();
}

function addTask(){
	let input = document.getElementById("taskInput");

	if(input.value.trim() == "") return;
	tasks.push({
		text: input.value,
		done: false
	});

	input.value = "";

	renderTasks();
}

function toggleTask(index){
	tasks[index].done = !tasks[index].done;
	renderTasks();
}

function deleteTask(index){
	tasks.splice(index, 1);
	renderTasks();
}

function editTask(index){
	let newText = prompt("Edit Task", tasks[index].text);
	if(newText){
		tasks[index].text = newText;
		renderTasks
		renderTasks();
	}
}

function filterTasks(type){
	filter = type;
	renderTasks();
}
renderTasks();
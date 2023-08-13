const input = document.querySelector(".input-box");
const activeList = document.querySelector(".list-items");
const completedList = document.querySelector(".completed-items");
const btn = document.querySelector(".btn-add");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

btn.addEventListener("click", function () {
  const task = input.value;

  if (!task) {
    alert("You must write something!");
  } else {
    const taskObject = {
      content: task,
      done: false,
      timestamp: new Date().toISOString(),
    };

    tasks.push(taskObject);
    updateLocalStorage();
    renderTasks();

    input.value = "";
  }
});

function renderTasks() {
  activeList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((taskObject, index) => {
    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = `${taskObject.content} - ${formatDate(
      taskObject.timestamp
    )}`; // Display content and timestamp
    task_input_el.readOnly = true;
    if (taskObject.done) {
      task_input_el.classList.add("done");
      completedList.appendChild(task_content_el);
    } else {
      activeList.appendChild(task_content_el);
    }

    const actions_el = document.createElement("div");
    actions_el.classList.add("action");

    const button1 = document.createElement("button");
    button1.classList.add("btn1");
    button1.innerHTML = "Done";

    const button2 = document.createElement("button");
    button2.classList.add("btn2");
    button2.innerHTML = "Delete";

    actions_el.appendChild(button1);
    actions_el.appendChild(button2);

    task_content_el.appendChild(task_input_el);
    task_content_el.appendChild(actions_el);

    button1.addEventListener("click", function () {
      taskObject.done = !taskObject.done;
      updateLocalStorage();
      renderTasks();
    });

    button2.addEventListener("click", function () {
      tasks.splice(index, 1);
      updateLocalStorage();
      renderTasks();
    });
  });
}

// Function to format a date string
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

renderTasks();

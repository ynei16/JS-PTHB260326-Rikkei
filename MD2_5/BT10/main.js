let tasks = [];

function addTask(title) {
  tasks.push(title);
}

function removeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
}

function displayTasks() {
  console.log("Danh sách công việc ");
  tasks.forEach((task, index) => {
    console.log(index + 1 + ". " + task);
  });
}

addTask("Học JS");
addTask("Làm bài tập");
displayTasks();
removeTask(0);
displayTasks();

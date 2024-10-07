document.addEventListener("DOMContentLoaded", () => {
// Add task to the list
function addTask(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve task description, priority, and due date
  const taskDescription = document.getElementById('new-task-description').value.trim();
  const taskPriority = document.getElementById('task-priority').value;
  const taskDueDate = document.getElementById('task-due-date').value;

  // Validate task description
  if (taskDescription === "") {
    alert("Task description cannot be empty!");
    return;
  }

  // Create new list item
  const taskItem = document.createElement('li');
  taskItem.textContent = `${taskDescription} (Due: ${taskDueDate ? taskDueDate : "No Due Date"})`;

  // Apply priority-based styling
  switch (taskPriority) {
    case 'high':
      taskItem.style.color = 'red';
      break;
    case 'medium':
      taskItem.style.color = 'orange';
      break;
    case 'low':
      taskItem.style.color = 'green';
      break;
  }

  // Create delete button for the task
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', () => {
    taskItem.remove();
  });

  // Append delete button to task item
  taskItem.appendChild(deleteBtn);

  // Append the task to the list
  document.getElementById('tasks').appendChild(taskItem);

  // Clear form fields after submission
  document.getElementById('new-task-description').value = '';
  document.getElementById('task-due-date').value = '';
}

// Attach event listener to form submit button
document.getElementById('create-task-form').addEventListener('submit', addTask);
});
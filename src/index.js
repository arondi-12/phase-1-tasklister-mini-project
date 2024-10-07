document.addEventListener("DOMContentLoaded", () => {
// Restrict due date to today or future dates
const dueDateInput = document.getElementById('task-due-date');
const today = new Date().toISOString().split('T')[0];
dueDateInput.setAttribute('min', today);
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
  // Create edit button for the task
  const editBtn = document.createElement('button');
  editBtn.textContent = "Edit";
  editBtn.addEventListener('click', () => editTask(taskItem, taskDescription, taskPriority, taskDueDate));

  // Append buttons to task item
  taskItem.appendChild(deleteBtn);
  taskItem.appendChild(editBtn);

  // Append delete button to task item
  taskItem.appendChild(deleteBtn);

  // Append the task to the list
  document.getElementById('tasks').appendChild(taskItem);

  // Clear form fields after submission
  document.getElementById('new-task-description').value = '';
  document.getElementById('task-due-date').value = '';
}
 // Function to edit a task
 function editTask(taskItem, oldDescription, oldPriority, oldDueDate) {
  // Populate form fields with current task values
  document.getElementById('new-task-description').value = oldDescription;
  document.getElementById('task-priority').value = oldPriority;
  document.getElementById('task-due-date').value = oldDueDate;

  // Remove the task being edited from the list
  taskItem.remove();

  // Update the submit button to handle the edit
  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.value = 'Update Task';

  // When the form is submitted, reset the button text
  document.getElementById('create-task-form').addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(event); // Re-add the updated task
    submitButton.value = 'Create New Task'; // Reset button text
  }, { once: true });
}
// Attach event listener to form submit button
document.getElementById('create-task-form').addEventListener('submit', addTask);
});
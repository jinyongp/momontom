(() => {
  const todoForm = document.querySelector('#todo-form');
  const todoInput = todoForm.querySelector('input');
  const todoList = document.querySelector('#todo-list');

  const ID_KEY = 'id';
  const TODO_KEY = 'todo';

  const currentTodoItems = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
  let id = localStorage.getItem(ID_KEY) || currentTodoItems.length + 1;
  if (currentTodoItems.length) currentTodoItems.forEach(({ id, item }) => printTodoItem(id, item));

  function saveTodoItems() {
    localStorage.setItem(TODO_KEY, JSON.stringify(currentTodoItems));
  }

  function printTodoItem(id, item) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.textContent = item;
    button.textContent = '✔';
    li.appendChild(span);
    li.appendChild(button);
    li.dataset.id = id;

    todoList.appendChild(li);
  }

  function addTodoItem(item) {
    printTodoItem(id, item);
    currentTodoItems.push({ id, item });
    saveTodoItems();
    id += 1;
  }

  function deleteTodoItem(todoItem) {
    const content = todoItem.querySelector('span').textContent;
    const todoId = todoItem.dataset.id;
    todoList.removeChild(todoItem);
    const index = currentTodoItems.findIndex(({ id, item }) => +todoId === id && content === item);
    currentTodoItems.splice(index, 1);
    saveTodoItems();
  }

  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value: todo } = todoInput;
    if (todo) addTodoItem(todo);
    todoInput.value = '';
  });

  todoList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;
    deleteTodoItem(event.target.parentNode);
  });
})();

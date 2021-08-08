class Todo {
  constructor(todoFormElement, todoInputElement, todoListElement, totalTodosElement, completedTodosElement, activeTodosElement) {
    this.todoFormElement = todoFormElement;
    this.todoInputElement = todoInputElement;
    this.todoListElement = todoListElement;
    this.totalTodosElement = totalTodosElement;
    this.completedTodosElement = completedTodosElement;
    this.activeTodosElement = activeTodosElement;
    this.todos = this._getTodosFromStorage() || [];
    this.renderInitialTodos();
  }

  addTodo(name) {
    const nameEdited = this._editText(name);
    const todo = {
      name: nameEdited,
      id: `todo-${Date.now()}`,
      isDone: false
    };

    if(name) {
      this.todos.push(todo);
      this._setTodosToStorage();
      this.renderTodo(todo);
      this.todoInputElement.value = '';
      this.todoInputElement.focus();
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    const todoElement = this.todoListElement.querySelector(`#${id}`);

    todoElement.remove();
    this.countTodos();
    this._setTodosToStorage();
  }

  
  renameTodo(id) {
    const todoLabelElement = this.todoListElement.querySelector(`#${id} label`);
    const todo = this.todos.find((todo) => todo.id === id);
    const nameEdited = this._editText(todoLabelElement.textContent);

    todoLabelElement.textContent = nameEdited;
    todo.name = nameEdited;
    this._setTodosToStorage();
  }

  completeTodo(id) {
    const todoLabelElement = this.todoListElement.querySelector(`#${id} label`);
    const todo = this.todos.find(todo => todo.id === id);
    
    todo.isDone = !todo.isDone;
    todoLabelElement.toggleAttribute('contenteditable');
    todoLabelElement.classList.toggle('checked');
    this._setTodosToStorage();
    this.countTodos();
  }

  countTodos() {
    this.totalTodosElement.textContent = `Total Todos: ${this.todos.length}`;
    this.completedTodosElement.textContent = `Completed Todos: ${this.todos.filter((todo) => todo.isDone).length}`;
    this.activeTodosElement.textContent = `Active Todos: ${this.todos.filter((todo) => !todo.isDone).length}`;
  }

  _getTodosFromStorage() {
    return JSON.parse(localStorage.getItem('todos'));
  }

  _setTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  _editText(text) {
    return text.length >= 30 ? `${text.slice(0, 30)}…` : text;
  }

  renderTodo(todo) {
    const todoElement = document.createElement('li');
    todoElement.id = todo.id;
    todoElement.classList.add('todo__list-item');
    const todoElementMarkup = `
      <div>
        <input type="checkbox" class="todo__list-ckeckbox" ${todo.isDone ? 'checked' : ''}>
        <label class="todo__list-name  ${todo.isDone ? 'checked' : ''}" ${!todo.isDone ? 'contenteditable' : ''}>${todo.name}</label>
      </div>
      <button class="todo__list-delete todo__button todo__button_red">Delete</button>
    `;
    todoElement.innerHTML = todoElementMarkup;
    this.todoListElement.appendChild(todoElement);
    this.countTodos();
  }

  renderInitialTodos() {
    if (this._getTodosFromStorage()) {
      this.todos.forEach(todo => {
        this.renderTodo(todo);
      });
    }
  }
}

const todoFormElement = document.querySelector('.todo__form');
const todoInputElement = document.querySelector('.todo__form-input');
const todoListElement = document.querySelector('.todo__list');
const totalTodosElement = document.querySelector('.todo_total');
const completedTodosElement = document.querySelector('.todo_done');
const activeTodosElement = document.querySelector('.todo_active');

const todo = new Todo(todoFormElement, todoInputElement, todoListElement, totalTodosElement, completedTodosElement, activeTodosElement);

todoFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  todo.addTodo(todoInputElement.value);
});

todoListElement.addEventListener('click', (e) => {
  const target = e.target;
  const targetListItemId = target.closest('li').id;
  if (target.classList.contains('todo__list-ckeckbox')) {
    todo.completeTodo(targetListItemId);
  }

  if (target.classList.contains('todo__list-delete')) {
    todo.removeTodo(targetListItemId);
  }
});

todoListElement.addEventListener('keydown', (e) => {
  const target = e.target;
  const targetListItemId = target.closest('li').id;

  if (e.keyCode === 13) {
    e.preventDefault();
  }

  todo.renameTodo(targetListItemId);
});

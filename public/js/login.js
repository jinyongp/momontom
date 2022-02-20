(() => {
  const loginForm = document.querySelector('#login-form');
  const loginInput = loginForm.querySelector('span');
  const greeting = document.querySelector('#greeting');
  const todoForm = document.querySelector('#todo-form');
  const todoList = document.querySelector('#todo-list');
  const LOGIN_KEY = 'username';
  let currentUsername = '';

  checkIfLogin();

  function login(username) {
    greeting.hidden = false;
    todoForm.hidden = false;
    todoList.removeAttribute('style');
    loginInput.textContent = username;
    currentUsername = username;
    localStorage.setItem(LOGIN_KEY, username);
  }

  function checkIfLogin() {
    const username = localStorage.getItem(LOGIN_KEY);
    if (username) {
      login(username);
    } else {
      todoList.style.display = 'none';
    }
  }

  loginInput.addEventListener('keypress', (event) => {
    const { isComposing, key } = event;
    if (isComposing) return;
    if (key === 'Enter') {
      event.preventDefault();
      const { textContent: username } = loginInput;
      if (username) login(username);
      loginInput.blur();
    }
  });

  loginInput.addEventListener('blur', () => {
    const { textContent: username } = loginInput;
    if (username) login(username);
    else loginInput.textContent = currentUsername;
  });

  loginInput.addEventListener('click', () => {
    loginInput.select();
  });
})();

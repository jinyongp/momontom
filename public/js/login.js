(() => {
  const loginForm = document.querySelector('#login-form');
  const loginInput = loginForm.querySelector('input');
  const greeting = document.querySelector('#greeting');
  const todoForm = document.querySelector('#todo-form');
  const LOGIN_KEY = 'username';
  let currentUsername = '';

  function login(username) {
    greeting.hidden = false;
    todoForm.hidden = false;
    loginInput.value = username;
    currentUsername = username;
    localStorage.setItem(LOGIN_KEY, username);
  }

  function checkIfLogin() {
    const username = localStorage.getItem(LOGIN_KEY);
    if (username) login(username);
  }

  checkIfLogin();

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value: username } = loginInput;
    if (username) login(username);
    loginInput.blur();
  });

  loginInput.addEventListener('blur', () => {
    loginInput.value = currentUsername;
  });
})();

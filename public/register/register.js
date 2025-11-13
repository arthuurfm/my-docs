import { registerUser } from './socket-front-register.js';

const form = document.getElementById('form-cadastro');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = form['input-usuario'].value;
  const password = form['input-senha'].value;

  registerUser({ user, password });
});
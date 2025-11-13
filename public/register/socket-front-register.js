const socket = io();

function registerUser(data) {
  socket.emit('register_user', data);
}

socket.on('successfully_register', () => alert('Registration successful.'));
socket.on('error_register', () => alert('Registration error.'));
socket.on('existing_user', () => alert('Existing user.'));

export { registerUser };
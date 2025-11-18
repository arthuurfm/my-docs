const socket = io();

function authenticateUser(data) {
  socket.emit('authenticate_user', data);
}

socket.on('authentication_successfully', () => {
  alert('User authentication successful!');
  window.location.href = '/';
});

socket.on('authentication_error', () => {
  alert('Authentication error!');
});

socket.on('not_found_user', () => {
  alert('Not found user!');
});

export { authenticateUser };
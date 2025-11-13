import UserDb from '../database/UserDb.js';

const users = new UserDb();

function registerEvents(socket, io) {
  socket.on('register_user', async (data) => {
    const user = await users.findUser(data.user);
    if (user === null) {
      const result = await users.registerUser(data);

      if (result.acknowledged) socket.emit('successfully_register');
      else socket.emit('error_register');
    } else {
      socket.emit('existing_user');
    }

  });
}

export default registerEvents;
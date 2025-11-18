import UserDb from "../database/UserDb.js";
import authenticateUser from "../utils/authenticateUser.js";
import generateJwt from "../utils/generateJwt.js";

function loginEvents(socket, io) {
  socket.on('authenticate_user', async ({ user, password }) => {
    const users = new UserDb();

    const foundUser = await users.findUser(user);
    if (foundUser) {
      const authenticade = authenticateUser(password, foundUser);
      if (authenticade) {
        const jwtToken = generateJwt({ username: user });
        socket.emit('authentication_successfully', jwtToken);
      } else {
        socket.emit('authentication_error');
      }
    } else {
      socket.emit('not_found_user');
    }

  });
}

export default loginEvents;
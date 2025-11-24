import jwt from 'jsonwebtoken';

function authorizeUser(socket, next) {
  const jwtToken = socket.handshake.auth.token;
  try {
    jwt.verify(jwtToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(error);
  }
}

export default authorizeUser;
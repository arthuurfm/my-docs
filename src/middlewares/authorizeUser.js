import jwt from 'jsonwebtoken';

function authorizeUser(socket, next) {
  const jwtToken = socket.handshake.auth.token;
  try {
    const payloadToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    socket.emit('authorization_success', payloadToken);
    next();
  } catch (error) {
    next(error);
  }
}

export default authorizeUser;
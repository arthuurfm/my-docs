import 'dotenv/config';
import documentEvents from './events/document.js';
import homeEvents from './events/home.js';
import loginEvents from './events/login.js';
import registerEvents from './events/register.js';
import io from './server.js';
import authorizeUser from './middlewares/authorizeUser.js';

const nspUsers = io.of('/users');

// middleware
nspUsers.use(authorizeUser);

nspUsers.on('connection', (socket) => {
  homeEvents(socket, nspUsers);
  documentEvents(socket, nspUsers);
});

io.of('/').on('connection', (socket) => {
  registerEvents(socket, io);
  loginEvents(socket, io);
});
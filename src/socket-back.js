import 'dotenv/config';
import documentEvents from './events/document.js';
import homeEvents from './events/home.js';
import loginEvents from './events/login.js';
import registerEvents from './events/register.js';
import io from './server.js';

io.on('connection', (socket) => {
  registerEvents(socket, io);
  loginEvents(socket, io);
  homeEvents(socket, io);
  documentEvents(socket, io);
});
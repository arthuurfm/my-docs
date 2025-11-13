import documentEvents from './events/document.js';
import homeEvents from './events/home.js';
import registerEvents from './events/register.js';
import io from './server.js';

io.on('connection', (socket) => {
  homeEvents(socket, io);
  documentEvents(socket, io);
  registerEvents(socket, io);
});
import io from './server.js';

io.on('connection', (socket) => {
  console.log(`A client with ID: "${socket.id}", has been connected!`);

  socket.on('selected_document', (documentName) => {
    socket.join(documentName);
  })

  socket.on('typed_text', (text) => {
    // envia para todos os clientes, menos para o que digitou neste socket.
    socket.broadcast.emit('client_typed_text', text)
  });

});
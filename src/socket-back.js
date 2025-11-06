import io from './server.js';

const documents = [
  {
    name: 'JavaScript',
    text: 'Texto de JavaScript...'
  },
  {
    name: 'Node',
    text: 'Texto de Node...'
  },
  {
    name: 'Socket.io',
    text: 'Texto de Socket.io...'
  },
];

io.on('connection', (socket) => {
  console.log(`A client with ID: "${socket.id}", has been connected!`);

  socket.on('selected_document', (documentName, returnData) => {
    socket.join(documentName);

    const document = findDocument(documentName);
    if (document) returnData(document.text);
  });

  socket.on('typed_text', ({ text, documentName }) => {
    const document = findDocument(documentName);

    if (document) {
      document.text = text;
      socket.to(documentName).emit('client_typed_text', text);
    }
  });

});

function findDocument(name) {
  const document = documents.find((document) => {
    return document.name === name;
  });

  return document;
}
import io from './server.js';
import DocumentDb from './database/DocumentDb.js';

const documents = new DocumentDb();

io.on('connection', (socket) => {
  console.log(`A client with ID: "${socket.id}", has been connected!`);

  socket.on('get_documents', async (returnData) => {
    const documentsList = await documents.getDocuments();
    returnData(documentsList);
  });

  socket.on('selected_document', async (documentName, returnData) => {
    socket.join(documentName);

    const document = await documents.findDocument(documentName);

    if (document) returnData(document.text);
  });

  socket.on('typed_text', async ({ text, documentName }) => {
    const update = await documents.updateDocument(documentName, text);

    if (update.modifiedCount) {
      socket.to(documentName).emit('client_typed_text', text);
    }
  });

});
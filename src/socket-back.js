import io from './server.js';
import DocumentDb from './database/DocumentDb.js';

const documents = new DocumentDb();

io.on('connection', (socket) => {
  socket.on('get_documents', async (returnData) => {
    const documentsList = await documents.getDocuments();
    returnData(documentsList);
  });

  socket.on('add_document', async (name) => {
    const thereIsDocument = (await documents.findDocument(name)) !== null;
    if (thereIsDocument) {
      socket.emit('existing_document', name);
    } else {
      const result = await documents.addDocument(name);
      if (result.acknowledged) io.emit('add_document_interface', name);
    }
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

  socket.on('delete_document', async (name) => {
    const result = await documents.deleteDocument(name);
    
    if (result.deletedCount) {
      io.emit('document_successfully_deleted', name);
    }
  })

});
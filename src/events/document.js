import DocumentDb from "../database/DocumentDb.js";

const documents = new DocumentDb();

function documentEvents(socket, io) {
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
  });
}

export default documentEvents;
import DocumentDb from "../database/DocumentDb.js";

const documents = new DocumentDb();

function homeEvents(socket, io) {
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
}

export default homeEvents;
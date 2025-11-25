import DocumentDb from '../database/DocumentDb.js';
import { addConnection, getUserDocument, removeConnection, findConnection } from '../utils/documentConnections.js';

const documents = new DocumentDb();

function documentEvents(socket, io) {
  socket.on('selected_document', async ({ documentName, username }, returnData) => {
    const document = await documents.findDocument(documentName);
    
    if (document) {
      const foundConnection = findConnection(documentName, username);
      if (!foundConnection) {
        socket.join(documentName);
        addConnection({
          documentName,
          username
        });

        socket.data = {
          userJoin: true
        };
  
        const usersOnDocument = getUserDocument(documentName);
        io.to(documentName).emit('users_on_document', usersOnDocument);
        returnData(document.text);
      } else {
        socket.emit('user_already_on_document');
      }
    }

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

    socket.on('disconnect', () => {
      if (socket.data.userJoin) {
        removeConnection(documentName, username);
        const usersOnDocument = getUserDocument(documentName);
        io.to(documentName).emit('users_on_document', usersOnDocument);
      }
    });
  });
}

export default documentEvents;
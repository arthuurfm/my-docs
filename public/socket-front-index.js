import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io();

socket.emit('get_documents', (documents) => {
  documents.forEach((document) => {
    insertDocumentLink(document.name);
  });
});

function addDocument(name) {
  socket.emit('add_document', name);
}

socket.on('add_document_interface', (name) => {
  insertDocumentLink(name);
});

socket.on('existing_document', (name) => {
  alert(`The document ${name} already exists.`);
});

socket.on('document_successfully_deleted', (name) => {
  removeDocumentLink(name);
});

export { addDocument };
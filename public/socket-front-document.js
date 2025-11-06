import { updateTypedText } from "./document.js";

const socket = io();

function selectedDocument(name) {
  socket.emit('selected_document', name, (text) => {
    updateTypedText(text);
  });
}

// socket.emit: emite e cria um evento personalizado.
function emitTypedText(data) {
  socket.emit('typed_text', data);
}

socket.on('document_text', (text) => {
  updateTypedText(text);
});

// socket.on: "ouve" um evento.
socket.on('client_typed_text', (text) => {
  updateTypedText(text);
});

export { emitTypedText, selectedDocument };
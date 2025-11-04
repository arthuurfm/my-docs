import { updateTypedText } from "./document.js";

const socket = io();

function selectedDocument(name) {
  socket.emit('selected_document', name);
}

// socket.emit: emite e cria um evento personalizado.
function emitTypedText(text) {
  socket.emit('typed_text', text);
}

// socket.on: "ouve" um evento.
socket.on('client_typed_text', (text) => {
  updateTypedText(text);
});

export { emitTypedText, selectedDocument };
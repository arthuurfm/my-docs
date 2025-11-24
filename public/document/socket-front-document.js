import { alertAndRedirect, updateTypedText } from './document.js';
import { getCookie } from '../utils/cookies.js';

const socket = io('/users', {
  auth: {
    token: getCookie('jwtToken')
  }
});

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

function deleteDocument(name) {
  socket.emit('delete_document', name);
}

socket.on('document_successfully_deleted', (name) => {
  alertAndRedirect(name);
});

export { emitTypedText, selectedDocument , deleteDocument };
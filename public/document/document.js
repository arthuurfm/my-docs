import { emitTypedText, selectedDocument, deleteDocument } from './socket-front-document.js';

const params = new URLSearchParams(window.location.search);
const documentName = params.get('name');

const editorText = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');
const deleteButton = document.getElementById('excluir-documento');
const connectedUsers = document.getElementById('usuarios-conectados');

documentTitle.textContent = documentName || 'Documento sem título';
document.title = `MyDocs | ${documentName}`;

function treatAuthorizationSuccess(payloadToken) {
  selectedDocument({ 
    documentName, 
    username: payloadToken.username
  });
}

function updateUserInterface(usersOnDocument) {
  connectedUsers.innerHTML = '';
  usersOnDocument.forEach((user) => {
    connectedUsers.innerHTML += `
      <li class="list-group-item">${user}</li>
    `;
  })
}

editorText.addEventListener('keyup', () => {
  emitTypedText({
    text: editorText.value,
    documentName
  });
});

function updateTypedText(text) {
  editorText.value = text;
}

deleteButton.addEventListener('click', () => {
  deleteDocument(documentName);
});

function alertAndRedirect(name) {
  if (name === documentName) {
    alert(`${name} document deleted.`);
    window.location.href = '/';
  }
}

export { updateTypedText, alertAndRedirect, treatAuthorizationSuccess, updateUserInterface };
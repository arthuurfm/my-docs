import { emitTypedText, selectedDocument, deleteDocument } from './socket-front-document.js';

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const editorText = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');
const deleteButton = document.getElementById('excluir-documento');

documentTitle.textContent = documentName || 'Documento sem título';
document.title = `MyDocs | ${documentName}`;

selectedDocument(documentName);

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

export { updateTypedText, alertAndRedirect };
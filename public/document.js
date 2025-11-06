import { emitTypedText, selectedDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const editorText = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');

documentTitle.textContent = documentName || 'Documento sem título';

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

export { updateTypedText };
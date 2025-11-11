import { addDocument } from "./socket-front-index.js";

const documentsList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocument = document.getElementById('input-documento');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addDocument(inputDocument.value);
  inputDocument.value = '';
});

function insertDocumentLink(name) {
  documentsList.innerHTML += `
    <a 
      href="documento.html?nome=${name}" 
      class="list-group-item list-group-item-action"
      id="document-${name}"
    >
      ${name}
    </a>
  `;
}

function removeDocumentLink(name) {
  const deletedDocument = document.getElementById(`document-${name}`);
  documentsList.removeChild(deletedDocument);
}

export { insertDocumentLink, removeDocumentLink };
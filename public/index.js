import { addDocument } from './socket-front-index.js';
import { getCookie, removeCookie } from './utils/cookies.js';

const jwtToken = getCookie('jwtToken');
console.log(jwtToken);

const documentsList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDocument = document.getElementById('input-documento');
const logoutBtn = document.getElementById('botao-logout')

logoutBtn.addEventListener('click', () => {
  removeCookie('jwtToken');
  alert('User successfully logged out!');
  window.location.href = '/login/index.html';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addDocument(inputDocument.value);
  inputDocument.value = '';
});

function insertDocumentLink(name) {
  documentsList.innerHTML += `
    <a 
      href="/document/index.html?name=${name}" 
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
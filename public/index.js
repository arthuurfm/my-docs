import './socket-front-index.js';

const documentsList = document.getElementById('lista-documentos');

function insertDocumentLink(name) {
  documentsList.innerHTML += `
    <a 
      href="documento.html?nome=${name}" 
      class="list-group-item list-group-item-action"
    >
      ${name}
    </a>
  `;
}

export default insertDocumentLink;
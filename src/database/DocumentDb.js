import Database from "./Database.js";

class DocumentDb extends Database {
  constructor (documentsList) {
    super();
    this.documentsList = documentsList;
  }

  #getDocumentsList() {
    return this.documentsList = this.database.collection('documents');
  }

  getDocuments() {
    const documents = this.#getDocumentsList().find().toArray();
    return documents;
  }
  
  addDocument(name) {
    const result = this.#getDocumentsList().insertOne({
      name,
      text: ''
    });

    return result;
  }

  findDocument(name) {
    const document = this.#getDocumentsList().findOne({ name });
    
    return document;
  }

  updateDocument(name, text) {
    const update = this.#getDocumentsList().updateOne(
      { name }, 
      { $set: { text } }
    );

    return update;
  }

  deleteDocument(name) {
    const deleted = this.#getDocumentsList().deleteOne({ name });
    return deleted;
  }
}

export default DocumentDb;
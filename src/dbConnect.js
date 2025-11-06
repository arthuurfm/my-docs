import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://test:test123@docs-cluster.qwznupm.mongodb.net/?appName=docs-cluster');

let documentsList;

try { 
  await client.connect();
  const db = client.db('websockets');
  documentsList = db.collection('documents');

  console.log('MongoDB connection successfully!')
} catch (error) {
  console.log(error);
}

export { documentsList };
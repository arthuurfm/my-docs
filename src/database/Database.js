import { MongoClient } from 'mongodb';

class Database {
  constructor (
    client = new MongoClient('mongodb+srv://test:test123@docs-cluster.qwznupm.mongodb.net/?appName=docs-cluster'),
    database = client.db('websockets'),
  ) {
    this.client = client;
    this.database = database;
  }

  async connection() {
    try { 
      await this.client.connect();
      this.database = this.client.db('websockets');

      console.log('MongoDB connection successfully!')
    } catch (error) {
      console.log(error);
    }
  }
}

export default Database;
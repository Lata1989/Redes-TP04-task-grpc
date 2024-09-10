import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let db;

export async function connectDB() {
  if (!db) {
    try {
      const client = await MongoClient.connect(uri);
      db = client.db(dbName);
      console.log('Conectado a la base de datos');
    } catch (err) {
      console.error('Error al conectar a MongoDB', err);
    }
  }
  return db;
}

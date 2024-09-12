import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION;

let db;

export async function connectDB() {
  try {
    const client = await MongoClient.connect(uri);
    console.log('Conectado a MongoDB');
    db = client.db(dbName);
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    throw err;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('No se ha establecido conexión a la base de datos');
  }
  return db;
}

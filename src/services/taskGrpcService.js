import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let db;

// Conexión a MongoDB
MongoClient.connect(uri, (err, client) => {
  if (err) throw err;
  console.log('Conectado a MongoDB');
  db = client.db(dbName);
});

export function GetTaskStats(call, callback) {
  db.collection('tasks').countDocuments({}, (err, count) => {
    if (err) return callback(err, null);
    callback(null, { total_tasks: count });
  });
}

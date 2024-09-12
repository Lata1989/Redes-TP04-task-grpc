import { getDB } from '../config/dbConfig.js';

export async function GetTaskStats(call, callback) {
  try {
    const db = getDB();
    const collectionName = process.env.COLLECTION; // Usa la variable de entorno para el nombre de la colección

    // Contar todas las tareas
    const totalCount = await db.collection(collectionName).countDocuments({});
    
    // Contar las tareas completadas
    const completedCount = await db.collection(collectionName).countDocuments({ estado: 'Completado' });

    console.log('Total de tareas encontradas:', totalCount); // Log para depuración
    console.log('Total de tareas completadas:', completedCount); // Log para depuración
    
    // Enviar respuesta al cliente con ambos conteos
    callback(null, { Total: totalCount, Completas: completedCount });
  } catch (err) {
    console.error('Error al obtener el conteo de tareas:', err);
    callback(err, null);
  }
}

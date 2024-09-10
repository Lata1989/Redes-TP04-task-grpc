import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { GetTaskStats } from './services/taskGrpcService.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROTO_PATH = `${__dirname}/../tasks.proto`;

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const taskProto = grpc.loadPackageDefinition(packageDefinition).tasks;

const server = new grpc.Server();

server.addService(taskProto.TaskAnalysisService.service, { GetTaskStats });

const PORT = process.env.PORT || '50051';

server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Servidor gRPC corriendo en el puerto ${PORT}`);
});

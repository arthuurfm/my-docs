import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import './dbConnect.js';

const app = express();
const PORT = process.env.PORT || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, '../..', 'public');
app.use(express.static(publicDirectory));

const serverHttp = http.createServer(app);

serverHttp.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

// métodos do socket.io.
const io = new Server(serverHttp);

export default io;
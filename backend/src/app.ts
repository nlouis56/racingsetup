import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import "reflect-metadata";
import { Server } from "socket.io";
import authRoutes from './auth/routes/routesPost';
import vehicleRoutes from './vehicles/routes/routes';
import { AppDataSource } from './data-source';
import { swagger } from './documentation';
import setupRoutes from './setup/routes/routesPost';
import adminRoutes from './user/routes/routes';
import teamRouter from './team/routes/routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();
// Setup Socket.IO
const server = createServer(app);
const io = new Server(server, {
    cors: {
        // origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
        origin: "*",
        allowedHeaders: ["Content-Type", "Authorization"]
    },
  });
const PORT = process.env.BACKEND_PORT || 8080;

app.use(cors({
    // origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use(express.json());
app.use('/api/docs', swagger.serve, swagger.setup)

// Setup routes
app.use('/api/user', authRoutes);
app.use('/api/user/vehicles', vehicleRoutes);
app.use('/api/user', setupRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', teamRouter);

AppDataSource.initialize().then(() => {
  // Démarre le serveur
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch((error) => console.error('Error initializing data source:', error));

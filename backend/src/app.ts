import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import "reflect-metadata";
import { Server } from "socket.io";
import authRoutes from './auth/routes/routesPost';
// import routerChannel from './setup/routes/routesPost';
import { AppDataSource } from './data-source';
import { swagger } from './documentation';
// import privateMessageRouter from './privateMessage/routes/routes';
// import userRoutes from './user/routes/routes';

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
app.use('/docs', swagger.serve, swagger.setup)

// Setup routes
app.use('/api/user', authRoutes);
// app.use("/api/channel", routerChannel);
// app.use('/api/user', userRoutes);
// app.use('/api/privateMessage', privateMessageRouter);

AppDataSource.initialize().then(() => {
  // Démarre le serveur
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  // Configure Socket.io pour la messagerie et les notifications en temps réel
  /* const notificationService = setupNotificationSocket(io);
  setupSocket(io);


  // Intégration des événements d'application avec les notifications
  io.on("send_private_message", (data) => {
    const notification: PrivateMessageNotification = {
      type: "PRIVATE_MESSAGE",
      fromUserId: data.senderId,
      toUserId: data.receiverId,
      message: data.content,
      timestamp: new Date(),
    };
    notificationService.sendPrivateMessageNotification(notification);
  });

  io.on("send_channel_message", (data) => {
    const notification: ChannelMessageNotification = {
      type: "CHANNEL_MESSAGE",
      channelId: data.channelId,
      fromUserId: data.userId,
      message: data.content,
      timestamp: new Date(),
    };
    notificationService.sendChannelMessageNotification(notification);
  }); */

}).catch((error) => console.error('Error initializing data source:', error));

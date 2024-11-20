import { Server, Socket } from "socket.io";
import { NotificationService } from "./api/resolver";

export function setupNotificationSocket(io: Server) {
  const notificationService = new NotificationService(io);

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Rejoindre un espace utilisateur pour recevoir des notifications personnelles
    socket.on("join_user", (userId: number) => {
      socket.join(`user_${userId}`);
      console.log(`User ${socket.id} joined user room ${userId}`);
    });

    // Rejoindre un canal pour recevoir les notifications de canal
    socket.on("join_channel", (channelId: number) => {
      socket.join(`channel_${channelId}`);
      console.log(`User ${socket.id} joined channel room ${channelId}`);
    });

    // Déconnexion
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return notificationService;
}

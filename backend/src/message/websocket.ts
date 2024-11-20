import { Server, Socket } from "socket.io";
import { MessageService } from "./api/resolver";
import { MessageRepository } from "./repository/repositoryPostgresql";

const messageService = new MessageService(new MessageRepository());

export function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Rejoindre un canal
    socket.on("join_channel", (channelId: number) => {
      socket.join(`channel_${channelId}`);
      console.log(`User ${socket.id} joined channel ${channelId}`);
    });

    // Envoyer un message dans un canal
    socket.on("send_message", async (data) => {
      const message = await messageService.sendMessage(data);

      // Émettre le message à tous les utilisateurs du canal
      io.to(`channel_${data.channelId}`).emit("receive_message", message);
    });

    // Quitter un canal
    socket.on("leave_channel", (channelId: number) => {
      socket.leave(`channel_${channelId}`);
      console.log(`User ${socket.id} left channel ${channelId}`);
    });

    // Déconnexion
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

import { Server } from "socket.io";
import { Notification, PrivateMessageNotification, ChannelMessageNotification } from "./domain";

export class NotificationService {
  constructor(private io: Server) {}

  sendPrivateMessageNotification(notification: PrivateMessageNotification) {
    this.io.to(`user_${notification.toUserId}`).emit("notification", notification);
  }

  sendChannelMessageNotification(notification: ChannelMessageNotification) {
    this.io.to(`channel_${notification.channelId}`).emit("notification", notification);
  }

  sendNotification(notification: Notification) {
    if (notification.type === "PRIVATE_MESSAGE") {
      this.sendPrivateMessageNotification(notification as PrivateMessageNotification);
    } else if (notification.type === "CHANNEL_MESSAGE") {
      this.sendChannelMessageNotification(notification as ChannelMessageNotification);
    }
  }
}
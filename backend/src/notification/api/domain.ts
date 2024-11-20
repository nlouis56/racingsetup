export interface PrivateMessageNotification {
    type: "PRIVATE_MESSAGE";
    fromUserId: number;
    toUserId: number;
    message: string;
    timestamp: Date;
  }
  
  export interface ChannelMessageNotification {
    type: "CHANNEL_MESSAGE";
    channelId: number;
    fromUserId: number;
    message: string;
    timestamp: Date;
  }
  
  export type Notification = PrivateMessageNotification | ChannelMessageNotification;
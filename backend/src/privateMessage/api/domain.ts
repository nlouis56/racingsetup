export interface SendPrivateMessageDTO {
    senderId: number;
    receiverId: number;
    content: string;
  }
  
  export interface PrivateMessageResponse {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    isRead: boolean;
    createdAt: Date;
  }
  
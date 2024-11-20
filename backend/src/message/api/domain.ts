export interface SendMessageDTO {
    channelId: number;
    userId: number;
    content: string;
  }
  
  export interface MessageResponse {
    id: number;
    channelId: number;
    userId: number;
    content: string;
    createdAt: Date;
  }
  
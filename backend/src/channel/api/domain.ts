export interface CreateChannelDTO {
    name: string;
    theme: string;
    isPrivate?: boolean;
    createdBy: number; // User ID
  }
  
  export interface SubscribeChannelDTO {
    channelId: number;
    userId: number;
    role?: string; // Ex: "follower", "subscriber"
  }
  
  export interface ChannelRoleDTO {
    channelId: number;
    userId: number;
    role: string; // Ex: "owner", "admin", "member"
  }
  
import { SendPrivateMessageDTO, PrivateMessageResponse } from "./domain";
import { PrivateMessageRepository } from "../repository/repositoryPostgresql";
import { PrivateMessages } from "../../entities/PrivateMessages";

export class PrivateMessageService {
  constructor(private readonly privateMessageRepository: PrivateMessageRepository) {}

  async sendPrivateMessage(data: SendPrivateMessageDTO): Promise<PrivateMessageResponse> {
    const { senderId, receiverId, content } = data;

    // Create and save the new message
    const newMessage = new PrivateMessages();
    newMessage.sender = { id: senderId } as any;
    newMessage.receiver = { id: receiverId } as any;
    newMessage.content = content;
    newMessage.isRead = false;

    const savedMessage = await this.privateMessageRepository.save(newMessage);

    return {
      id: savedMessage.id,
      senderId: savedMessage.sender.id,
      receiverId: savedMessage.receiver.id,
      content: savedMessage.content,
      isRead: savedMessage.isRead,
      createdAt: savedMessage.createdAt,
    };
  }

  async getConversation(userId1: number, userId2: number): Promise<PrivateMessageResponse[]> {
    const messages = await this.privateMessageRepository.getConversation(userId1, userId2);

    return messages.map((message) => ({
      id: message.id,
      senderId: message.sender.id,
      receiverId: message.receiver.id,
      content: message.content,
      isRead: message.isRead,
      createdAt: message.createdAt,
    }));
  }

  async markAsRead(messageId: number): Promise<void> {
    await this.privateMessageRepository.markAsRead(messageId);
  }
}

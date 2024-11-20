import { SendMessageDTO, MessageResponse } from "./domain";
import { MessageRepository } from "../repository/repositoryPostgresql";
import { Message } from "../../entities/Message";

export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async sendMessage(data: SendMessageDTO): Promise<MessageResponse> {
    const { channelId, userId, content } = data;

    // Créer et sauvegarder le message dans la base de données
    const newMessage = new Message();
    newMessage.channel = { id: channelId } as any;
    newMessage.user = { id: userId } as any;
    newMessage.content = content;

    const savedMessage = await this.messageRepository.save(newMessage);
    
    return {
      id: savedMessage.id,
      channelId: savedMessage.channel.id,
      userId: savedMessage.user.id,
      content: savedMessage.content,
      createdAt: savedMessage.createdAt,
    };
  }

  // Ajout de la méthode getMessagesByChannel
  async getMessagesByChannel(channelId: number): Promise<MessageResponse[]> {
    const messages = await this.messageRepository.getMessagesByChannel(channelId);

    return messages.map((message) => ({
      id: message.id,
      channelId: message.channel.id,
      userId: message.user.id,
      content: message.content,
      createdAt: message.createdAt,
    }));
  }
}

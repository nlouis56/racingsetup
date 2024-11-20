import { Repository } from "typeorm";
import { PrivateMessage } from "../../entities/PrivateMessage";
import { AppDataSource } from "../../data-source";

export class PrivateMessageRepository {
  private messageRepository: Repository<PrivateMessage>;

  constructor() {
    this.messageRepository = AppDataSource.getRepository(PrivateMessage);
  }

  async save(message: PrivateMessage): Promise<PrivateMessage> {
    return await this.messageRepository.save(message);
  }

  async getConversation(userId1: number, userId2: number): Promise<PrivateMessage[]> {
    return await this.messageRepository.find({
      where: [
        { sender: { id: userId1 }, receiver: { id: userId2 } },
        { sender: { id: userId2 }, receiver: { id: userId1 } },
      ],
      order: { createdAt: "ASC" },
      relations: ["sender", "receiver"],
    });
  }

  async markAsRead(messageId: number): Promise<void> {
    await this.messageRepository.update({ id: messageId }, { isRead: true });
  }
}

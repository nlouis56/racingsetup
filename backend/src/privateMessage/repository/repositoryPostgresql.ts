import { Repository } from "typeorm";
import { PrivateMessages } from "../../entities/PrivateMessages";
import { AppDataSource } from "../../data-source";

export class PrivateMessageRepository {
  private messageRepository: Repository<PrivateMessages>;

  constructor() {
    this.messageRepository = AppDataSource.getRepository(PrivateMessages);
  }

  async save(message: PrivateMessages): Promise<PrivateMessages> {
    return await this.messageRepository.save(message);
  }

  async getConversation(userId1: number, userId2: number): Promise<PrivateMessages[]> {
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

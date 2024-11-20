import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Message } from "../../entities/Message";

export class MessageRepository {
  private messageRepository: Repository<Message>;

  constructor() {
    this.messageRepository = AppDataSource.getRepository(Message);
  }

  async save(message: Message): Promise<Message> {
    return await this.messageRepository.save(message);
  }

  async getMessagesByChannel(channelId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { channel: { id: channelId } },
      relations: ["user"], // Pour inclure les informations de l'utilisateur
    });
  }
}

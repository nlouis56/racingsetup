import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Channel } from "../../entities/Channel";
import { ChannelSubscription } from "../../entities/ChannelSubscription";
import { ChannelRole } from "../../entities/ChannelRole";

export class ChannelRepository {
  private channelRepository: Repository<Channel>;
  private subscriptionRepository: Repository<ChannelSubscription>;
  private roleRepository: Repository<ChannelRole>;

  constructor() {
    this.channelRepository = AppDataSource.getRepository(Channel);
    this.subscriptionRepository = AppDataSource.getRepository(ChannelSubscription);
    this.roleRepository = AppDataSource.getRepository(ChannelRole);
  }

  async findByName(name: string): Promise<Channel | null> {
    return await this.channelRepository.findOne({ where: { name } });
  }

  async findById(id: number): Promise<Channel | null> {
    return await this.channelRepository.findOne({ where: { id } });
  }

  async save(channel: Channel): Promise<Channel> {
    return await this.channelRepository.save(channel);
  }

  async addSubscription(channelId: number, userId: number, role: string): Promise<ChannelSubscription> {
    const subscription = this.subscriptionRepository.create({
      channel: { id: channelId } as any,
      user: { id: userId } as any,
      role,
    });
    return await this.subscriptionRepository.save(subscription);
  }

  async setRole(channelId: number, userId: number, role: string): Promise<ChannelRole> {
    let channelRole = await this.roleRepository.findOne({ where: { channel: { id: channelId }, user: { id: userId } } });
    if (!channelRole) {
      channelRole = this.roleRepository.create({ channel: { id: channelId } as any, user: { id: userId } as any, role });
    } else {
      channelRole.role = role;
    }
    return await this.roleRepository.save(channelRole);
  }
}

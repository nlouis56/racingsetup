import { Channel } from "../../entities/Channel";
import { ChannelRole } from "../../entities/ChannelRole";
import { ChannelSubscription } from "../../entities/ChannelSubscription";
import { ChannelRepository } from "../repository/repositoryPostgresql";
import { CreateChannelDTO, SubscribeChannelDTO, ChannelRoleDTO } from "./domain";

export class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}

  async createChannel(data: CreateChannelDTO): Promise<Channel> {
    const { name, theme, isPrivate, createdBy } = data;

    // Vérifier si le canal existe déjà
    const existingChannel = await this.channelRepository.findByName(name);
    if (existingChannel) {
      throw new Error("Channel already exists");
    }

    // Créer et sauvegarder le canal
    const newChannel = new Channel();
    newChannel.name = name;
    newChannel.theme = theme;
    newChannel.isPrivate = isPrivate || false;
    newChannel.createdBy = { id: createdBy } as any; // seulement ID

    return await this.channelRepository.save(newChannel);
  }

  async subscribeToChannel(data: SubscribeChannelDTO): Promise<ChannelSubscription> {
    const { channelId, userId, role } = data;

    // S'assurer que le canal existe
    const channel = await this.channelRepository.findById(channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }

    return await this.channelRepository.addSubscription(channelId, userId, role || "follower");
  }

  async setChannelRole(data: ChannelRoleDTO): Promise<ChannelRole> {
    const { channelId, userId, role } = data;

    // Vérifier si le canal existe
    const channel = await this.channelRepository.findById(channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }

    return await this.channelRepository.setRole(channelId, userId, role);
  }
}

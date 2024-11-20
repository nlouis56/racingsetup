import { Repository } from "typeorm";
import { Users } from "../../entities/Users";
import { AppDataSource } from "../../data-source";

export class UserRepository {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(Users);
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async save(user: Users): Promise<Users> {
    return await this.userRepository.save(user);
  }
}

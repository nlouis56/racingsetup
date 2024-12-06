import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";

export class UserRepository {
    private userRepository = AppDataSource.getRepository(Users);

    async findAllUsers(): Promise<Users[]> {
        return this.userRepository.find();
    }

    async createUser(data: Partial<Users>): Promise<Users> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async updateUser(id: number, data: Partial<Users>): Promise<Users | null> {
        await this.userRepository.update(id, data);
        return this.userRepository.findOne({ where: { id } });
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}

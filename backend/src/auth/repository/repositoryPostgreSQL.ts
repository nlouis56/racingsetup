import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/Users";

export class UserRepository {
    private userRepository = AppDataSource.getRepository(Users);

    async createUser(userData: Partial<Users>): Promise<Users> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async findUserByUsername(username: string): Promise<Users | null> {
        return this.userRepository.findOne({ where: { displayName: username } });
    }

    async findUserById(id: number): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new Error("User not found");
        return user;
    }

    async updateUser(id: number, userData: Partial<Users>): Promise<Users> {
        await this.userRepository.update(id, userData);
        return this.findUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}

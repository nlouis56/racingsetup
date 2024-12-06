import { hashPassword } from "../../utils/hash";
import { UserRepository } from "../repository/repositoryPostgreSQL";
import { CreateUserDTO, UpdateUserDTO } from "./domain";

export class UserResolver {
    private userRepository = new UserRepository();

    async getAllUsers() {
        return this.userRepository.findAllUsers();
    }

    async addUser(data: CreateUserDTO) {
        const defaultPassword = "user@123";
        const passwordHash = await hashPassword(defaultPassword);

        const newUser = await this.userRepository.createUser({
            ...data,
            passwordHash,
        });

        return { ...newUser, defaultPassword };
    }

    async updateUser(id: number, data: UpdateUserDTO) {
        return this.userRepository.updateUser(id, data);
    }

    async deleteUser(id: number) {
        await this.userRepository.deleteUser(id);
    }
}

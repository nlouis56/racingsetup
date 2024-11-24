import jwt from "jsonwebtoken";
import { UserDTO } from "./domain";
import { UserRepository } from "../repository/repositoryPostgreSQL";

const JWT_SECRET = process.env.JWT_SECRET

export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUserById(id: number): Promise<UserDTO | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }

        return {
            id: user.id.toString(),
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            racingNumber: user.racingNumber,
        };
    }

    async getUserByEmail(email: string): Promise<UserDTO | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }

        return {
            id: user.id.toString(),
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            racingNumber: user.racingNumber,
        };
    }

    async updateUser(data: UserDTO): Promise<UserDTO> {
        const user = await this.userRepository.findById(parseInt(data.id));
        if (!user) {
            throw new Error("User not found");
        }

        user.email = data.email;
        user.displayName = data.displayName;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.racingNumber = data.racingNumber;

        const updatedUser = await this.userRepository.updateUser(user);

        return {
            id: updatedUser.id.toString(),
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            racingNumber: updatedUser.racingNumber,
        };
    }
}

import jwt from "jsonwebtoken";
import { RegisterDTO, LoginDTO, AuthResponse } from "./domain";
import { UserRepository } from "../repository/repositoryPostgreSQL";
import { Users } from "../../entities/Users";
import { comparePasswords, hashPassword } from "../../utils/hash";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    async register(data: RegisterDTO): Promise<AuthResponse> {
        const { email, password, displayName, firstName, lastName, racingNumber } = data;

        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create and save the new user
        const user = new Users();
        user.email = email;
        user.passwordHash = hashedPassword;
        user.displayName = displayName;
        user.firstName = firstName;
        user.lastName = lastName;
        user.racingNumber = racingNumber;
        const savedUser = await this.userRepository.save(user);

        // Generate JWT token
        const token = jwt.sign({ userId: savedUser.id, email: savedUser.email, displayName: savedUser.displayName }, JWT_SECRET, { expiresIn: "1h" });

        return {
            token,
        };
    }

    async login(data: LoginDTO): Promise<AuthResponse> {
        const { email, password } = data;

        // Find user by email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Check password
        const isPasswordValid = await comparePasswords(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email, displayName: user.displayName }, JWT_SECRET, { expiresIn: "1h" });

        return {
            token,
        };
    }
}

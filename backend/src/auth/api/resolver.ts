import { Request, Response } from "express";
import { UserRepository } from "../repository/repositoryPostgreSQL";
import { RegisterUserDTO, LoginUserDTO, UpdateUserDTO, UserResponse } from "./domain";
import { hashPassword, comparePasswords } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

const userRepository = new UserRepository();

export class UserResolver {
    /**
     * POST /user/register
     */
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { password, ...userData }: RegisterUserDTO = req.body;
            const passwordHash = await hashPassword(password);

            const user = await userRepository.createUser({
                ...userData,
                passwordHash,
            });

            const token = generateToken(user.id);
            res.status(201).json({ token });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    /**
     * POST /user/login
     */
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password }: LoginUserDTO = req.body;
            const user = await userRepository.findUserByUsername(username);

            if (!user) throw new Error("Invalid credentials");

            const isMatch = await comparePasswords(password, user.passwordHash);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = generateToken(user.id);
            res.status(200).json({ token });
        } catch (err: any) {
            res.status(401).json({ message: err.message });
        }
    }

    /**
     * PUT /user/:id
     */
    async update(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            delete req.body.user;
            const updateData: UpdateUserDTO = req.body;

            if (updateData.passwordHash) {
                updateData.passwordHash = await hashPassword(updateData.passwordHash);
            }

            const user = await userRepository.updateUser(userId, updateData);
            res.status(200).json({ message: "User updated", user });
        }
        catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    
    

    /**
     * DELETE /user/:id
     */
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            await userRepository.deleteUser(userId);
            res.status(200).json({ message: "User deleted" });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    /**
     * GET /user/:id
     */
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user = await userRepository.findUserById(userId);

            const response: UserResponse = {
                id: user.id,
                username: user.displayName,
                racingNumber: user.racingNumber,
            };

            res.status(200).json(response);
        } catch (err: any) {
            res.status(404).json({ message: err.message });
        }
    }
}

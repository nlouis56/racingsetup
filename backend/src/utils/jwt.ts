import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config";

export const generateToken = (userId: number, isAdmin: boolean): string => {
  return jwt.sign({ userId, isAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

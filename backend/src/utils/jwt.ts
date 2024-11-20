import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config";

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

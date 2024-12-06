import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.body.user = user as { userId: number; email: string; displayName: string };
    next();
  });
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!req.body.user.isAdmin) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  next();
}

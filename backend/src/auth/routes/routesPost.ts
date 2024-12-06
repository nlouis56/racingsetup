import { Router } from "express";
import { UserResolver } from "../api/resolver";
import { authenticateToken } from "../../middleware/auth";

const router = Router();
const userResolver = new UserResolver();

router.post("/register", (req, res) => userResolver.register(req, res));
router.post("/login", (req, res) => userResolver.login(req, res));
router.put("/:id", authenticateToken, (req, res) => userResolver.update(req, res));
router.delete("/:id", authenticateToken, (req, res) => userResolver.delete(req, res));
router.get("/:id", authenticateToken, (req, res) => userResolver.getUser(req, res));

export default router;

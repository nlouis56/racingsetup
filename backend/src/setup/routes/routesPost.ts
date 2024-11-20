import express, { Request, Response } from "express";
import { SetupService } from "../api/resolver";
import { CreateSetupDTO } from "../api/domain";
import { authenticateToken } from "../../middleware/auth";

const router = express.Router();
const setupService = new SetupService();

/**
 * @swagger
 * /setup/create:
 *   post:
 *     summary: Create a new setup
 *     description: Create a new setup with the provided name, vehicle, and overall settings. Requires authentication.
 *     tags: [setup]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSetupDTO'
 *     responses:
 *       201:
 *         description: setup created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/setup'
 *       400:
 *         description: setup already exists or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.post("/create", authenticateToken, async (req: Request, res: Response) => {
  const data: CreateSetupDTO = req.body;
  data.userId = req.body.user.userId;
  try {
    const channel = await setupService.save(data);
    res.status(201).json(channel);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

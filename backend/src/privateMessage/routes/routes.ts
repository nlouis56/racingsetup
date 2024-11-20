import express, { Request, Response } from "express";
import { authenticateToken } from "../../middleware/auth";
import { PrivateMessageService } from "../api/resolver";
import { PrivateMessageRepository } from "../repository/repositoryPostgresql";
import { SendPrivateMessageDTO } from "../api/domain";

const router = express.Router();
const privateMessageService = new PrivateMessageService(new PrivateMessageRepository());

/**
 * @swagger
 * /privateMessage/send:
 *   post:
 *     summary: Send a private message
 *     description: Send a private message to a specific user. Requires authentication.
 *     tags: [PrivateMessage]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendPrivateMessageDTO'
 *     responses:
 *       201:
 *         description: Private message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateMessageResponse'
 *       400:
 *         description: Invalid request or error while sending private message
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
router.post("/send", authenticateToken, async (req: Request, res: Response) => {
  const data: SendPrivateMessageDTO = {
    ...req.body,
    senderId: req.body.user.userId, // Utilisateur connecté
  };
  try {
    const message = await privateMessageService.sendPrivateMessage(data);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /privateMessage/conversation:
 *   get:
 *     summary: Get a private conversation
 *     description: Retrieve all messages in a private conversation between the authenticated user and another specified user. Requires authentication.
 *     tags: [PrivateMessage]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     parameters:
 *       - in: query
 *         name: userId2
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the other user in the conversation
 *     responses:
 *       200:
 *         description: List of private messages in the conversation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateMessageResponse'
 *       400:
 *         description: Invalid request or error retrieving private messages
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
router.get("/conversation", authenticateToken, async (req: Request, res: Response) => {
  const userId1 = req.body.user.userId;
  const userId2 = parseInt(req.query.userId2 as string);

  try {
    const messages = await privateMessageService.getConversation(userId1, userId2);
    res.json(messages);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

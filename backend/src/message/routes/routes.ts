import express, { Request, Response } from "express";
import { MessageService } from "../api/resolver";
import { MessageRepository } from "../repository/repositoryPostgresql";
import { authenticateToken } from "../../middleware/auth";
import { SendMessageDTO } from "../api/domain";

const routerMessage = express.Router();
const messageService = new MessageService(new MessageRepository());

/**
 * @swagger
 * /message/send:
 *   post:
 *     summary: Send a message to a channel
 *     description: Send a message to a specific channel. Requires authentication.
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendMessageDTO'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Invalid request or error while sending message
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
routerMessage.post("/send", authenticateToken, async (req: Request, res: Response) => {
  const data: SendMessageDTO = {
    ...req.body,
    userId: req.body.user.userId, // Utilisateur connecté
  };
  try {
    const message = await messageService.sendMessage(data);
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /message/channel/{channelId}:
 *   get:
 *     summary: Get messages in a specific channel
 *     description: Retrieve all messages in a specific channel. Requires authentication.
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the channel
 *     responses:
 *       200:
 *         description: List of messages in the channel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Invalid request or error retrieving messages
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
routerMessage.get("/channel/:channelId", authenticateToken, async (req: Request, res: Response) => {
  const channelId = parseInt(req.params.channelId);
  try {
    const messages = await messageService.getMessagesByChannel(channelId);
    res.json(messages);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default routerMessage;

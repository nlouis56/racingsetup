import express, { Request, Response } from "express";
import { ChannelService } from "../api/resolver";
import { ChannelRepository } from "../repository/repositoryPostgresql";
import { CreateChannelDTO, SubscribeChannelDTO, ChannelRoleDTO } from "../api/domain";
import { authenticateToken } from "../../middleware/auth";

const router = express.Router();
const channelService = new ChannelService(new ChannelRepository());

/**
 * @swagger
 * /channel/create:
 *   post:
 *     summary: Create a new channel
 *     description: Create a new channel with the provided name, theme, and privacy settings. Requires authentication.
 *     tags: [Channel]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateChannelDTO'
 *     responses:
 *       201:
 *         description: Channel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Channel'
 *       400:
 *         description: Channel already exists or invalid request
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
  const data: CreateChannelDTO = req.body;
  data.createdBy = req.body.user.userId;
  try {
    const channel = await channelService.createChannel(data);
    res.status(201).json(channel);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /channel/subscribe:
 *   post:
 *     summary: Subscribe to a channel
 *     description: Allows a user to subscribe to a specific channel. Requires authentication.
 *     tags: [Channel]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscribeChannelDTO'
 *     responses:
 *       201:
 *         description: Subscribed to channel successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChannelSubscription'
 *       400:
 *         description: Channel not found or invalid request
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
router.post("/subscribe", authenticateToken, async (req: Request, res: Response) => {
  const data: SubscribeChannelDTO = {
    ...req.body,
    userId: req.body.user.userId,
  };
  try {
    const subscription = await channelService.subscribeToChannel(data);
    res.status(201).json(subscription);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /channel/setRole:
 *   post:
 *     summary: Set role for a user in a channel
 *     description: Assigns a specific role to a user in a channel. Requires authentication.
 *     tags: [Channel]
 *     security:
 *       - bearerAuth: []  # Requiert un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChannelRoleDTO'
 *     responses:
 *       200:
 *         description: Role set successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChannelRole'
 *       400:
 *         description: Channel or user not found, or invalid request
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
router.post("/setRole", authenticateToken, async (req: Request, res: Response) => {
  const data: ChannelRoleDTO = req.body;
  try {
    const role = await channelService.setChannelRole(data);
    res.status(200).json(role);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

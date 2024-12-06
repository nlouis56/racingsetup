import { Router } from "express";
import { VehicleResolver } from "../api/resolver";
import { authenticateToken } from "../../middleware/auth";

const router = Router();
const vehicleResolver = new VehicleResolver();

/**
 * @swagger
 * /api/user/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags:
 *       - Vehicle
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleType:
 *                 type: string
 *                 enum: [kart, track_car, road_car, rally_car]
 *                 example: kart
 *               name:
 *                 type: string
 *                 example: "Fast Kart"
 *               description:
 *                 type: string
 *                 example: "A high-speed kart for competitive racing"
 *     responses:
 *       201:
 *         description: Vehicle successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicleId:
 *                   type: integer
 *                   example: 1
 *                 vehicleType:
 *                   type: string
 *                   example: kart
 *                 name:
 *                   type: string
 *                   example: "Fast Kart"
 *                 description:
 *                   type: string
 *                   example: "A high-speed kart for competitive racing"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, (req, res) => vehicleResolver.createVehicle(req, res));

/**
 * @swagger
 * /api/user/vehicles/list:
 *   get:
 *     summary: Get all vehicles for the authenticated user
 *     tags:
 *       - Vehicle
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   vehicleId:
 *                     type: integer
 *                     example: 1
 *                   vehicleType:
 *                     type: string
 *                     example: kart
 *                   name:
 *                     type: string
 *                     example: "Fast Kart"
 *                   description:
 *                     type: string
 *                     example: "A high-speed kart for competitive racing"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/list', authenticateToken, (req, res) => vehicleResolver.getAllVehiclesByUser(req, res));

/**
 * @swagger
 * /api/user/vehicles/{id}:
 *   put:
 *     summary: Update a vehicle
 *     tags:
 *       - Vehicle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleType:
 *                 type: string
 *                 enum: [kart, track_car, road_car, rally_car]
 *                 example: kart
 *               name:
 *                 type: string
 *                 example: "Updated Kart"
 *               description:
 *                 type: string
 *                 example: "A high-speed kart for competitive racing"
 *     responses:
 *       200:
 *         description: Vehicle successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicleId:
 *                   type: integer
 *                   example: 1
 *                 vehicleType:
 *                   type: string
 *                   example: kart
 *                 name:
 *                   type: string
 *                   example: "Updated Kart"
 *                 description:
 *                   type: string
 *                   example: "Updated description"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticateToken, (req, res) => vehicleResolver.updateVehicle(req, res));

/**
 * @swagger
 * /api/user/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags:
 *       - Vehicle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Vehicle successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vehicle deleted"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateToken, (req, res) => vehicleResolver.deleteVehicle(req, res));

/**
 * @swagger
 * /api/user/vehicles/{id}:
 *   get:
 *     summary: Get details of a specific vehicle
 *     tags:
 *       - Vehicle
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Vehicle details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicleId:
 *                   type: integer
 *                   example: 1
 *                 vehicleType:
 *                   type: string
 *                   example: kart
 *                 name:
 *                   type: string
 *                   example: "Fast Kart"
 *                 description:
 *                   type: string
 *                   example: "A high-speed kart for competitive racing"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticateToken, (req, res) => vehicleResolver.getVehicle(req, res));


export default router;

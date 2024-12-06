import { Router } from 'express';
import { SetupResolver, SetupValueResolver } from '../api/resolver';
import { authenticateToken } from '../../middleware/auth';
import { SetupParameters, Setups, SetupValues } from '../../entities';

const router = Router();
const resolver = new SetupResolver();
const resolverValue = new SetupValueResolver();

/**
 * @swagger
 * /api/user/setup:
 *   post:
 *     summary: Create a new setup
 *     tags:
 *       - Setup
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rain Setup"
 *               description:
 *                 type: string
 *                 example: "Setup optimized for wet conditions"
 *               vehicleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Setup successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Rain Setup"
 *                 description:
 *                   type: string
 *                   example: "Setup optimized for wet conditions"
 *                 vehicleId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid setup
 */
router.post('/setup', authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    const setup = await resolver.createSetup({
        name: data.name,
        description: data.description,
        vehicle: data.vehicleId,
        user: req.body.user.userId,
    });
    res.json(setup);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Invalid setup' });
  }
});

/**
 * @swagger
 * /api/user/setup/list:
 *   get:
 *     summary: Get all setups for the authenticated user
 *     tags:
 *       - Setup
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of setups retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Rain Setup"
 *                   description:
 *                     type: string
 *                     example: "Setup optimized for wet conditions"
 *                   vehicleId:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Setups not found
 */
router.get('/setup/list', authenticateToken, async (req, res) => {
  try {
    const setups = await resolver.getAllSetups(req.body.user.userId);
    if (!setups) {
      throw new Error();
    }
    res.json(setups);
  } catch (error: any) {
      res.status(400).json({ message: 'Setups not found', error: error.message });
    }
})

/**
 * @swagger
 * /api/user/setup/{id}:
 *   put:
 *     summary: Update a setup
 *     tags:
 *       - Setup
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
 *               name:
 *                 type: string
 *                 example: "Rain Setup"
 *               description:
 *                 type: string
 *                 example: "Updated setup for wet conditions"
 *               track:
 *                 type: string
 *                 example: "Silverstone"
 *               vehicleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Setup successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Rain Setup"
 *                 description:
 *                   type: string
 *                   example: "Updated setup for wet conditions"
 *       400:
 *         description: Invalid setup
 */
router.put('/setup/:id', authenticateToken, async (req, res) => {
    try {
      const setup = await resolver.updateSetup(Number(req.params.id), {
          name: req.body.name,
          description: req.body.description,
          track: req.body.track,
          vehicle: req.body.vehicleId,
      });
      res.json(setup);
    } catch (error) {
      res.status(400).json({ message: 'Invalid setup' });
    }
});

/**
 * @swagger
 * /api/user/setup/{id}:
 *   delete:
 *     summary: Delete a setup
 *     tags:
 *       - Setup
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
 *         description: Setup successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Setup deleted"
 *       400:
 *         description: Invalid setup
 */
router.delete('/setup/:id', authenticateToken, async (req, res) => {
    try {
      await resolver.deleteSetup(Number(req.params.id));
      res.json({ message: 'Setup deleted' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid setup' });
    }
});

/**
 * @swagger
 * /api/user/setup/{id}:
 *   get:
 *     summary: Get a setup by ID
 *     tags:
 *       - Setup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: The ID of the setup to retrieve
 *     responses:
 *       200:
 *         description: Setup retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Rain Setup"
 *                 description:
 *                   type: string
 *                   example: "Setup optimized for wet conditions"
 *                 track:
 *                   type: string
 *                   example: "Silverstone"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-05T22:02:24.016Z"
 *                 vehicle:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Vehicle 1"
 *                     description:
 *                       type: string
 *                       example: "A fast vehicle"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-05T22:02:23.998Z"
 *                 user:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     displayName:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: Setup not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Setup not found"
 */
router.get('/setup/:id', authenticateToken, async (req, res) => {
    try {
      delete req.body.user;
      const setup = await resolver.getSetupById(Number(req.params.id));
      if (!setup) {
          throw new Error();
      }
      res.json(setup);
    } catch (error) {
      res.status(400).json({ message: 'Setup not found' });
    }
});

/**
 * @swagger
 * /api/user/setup/{id}/values:
 *   post:
 *     summary: Add a parameter value to a setup
 *     tags:
 *       - Setup Values
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
 *               parameterId:
 *                 type: integer
 *                 example: 1
 *               value:
 *                 type: object
 *                 example: { "front": 1.2, "rear": 1.3 }
 *     responses:
 *       201:
 *         description: Parameter value added to setup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 setupId:
 *                   type: integer
 *                   example: 1
 *                 setupValueId:
 *                   type: integer
 *                   example: 1
 *                 value:
 *                   type: object
 *                   example: { "front": 1.2, "rear": 1.3 }
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/setup/:id/values', authenticateToken, async (req, res) => {
    try {
        const setupId = parseInt(req.params.id, 10);
        const { parameterId, value } = req.body;

        // Vérifiez si le setup et le paramètre existent
        const savedValue = await resolverValue.createSetupValue({
            setup: { id: setupId } as Setups,
            parameter: { id: parameterId } as SetupParameters,
            value,
        });

        res.status(201).json({
            setupId: savedValue.setup.id,
            setupValueId: savedValue.id,
            value: savedValue.value,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'An error occurred',
            error: error.message,
        });
    }
});

/**
 * @swagger
 * /api/user/setup/{id}/values/{valueId}:
 *   put:
 *     summary: Update a parameter value in a setup
 *     tags:
 *       - Setup Values
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - name: valueId
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
 *               value:
 *                 type: object
 *                 example: { "front": 1.4, "rear": 1.5 }
 *     responses:
 *       200:
 *         description: Parameter value updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 value:
 *                   type: object
 *                   example: { "front": 1.4, "rear": 1.5 }
 *       400:
 *         description: Invalid value
 */
router.put('/setup/:id/values/:valueId', authenticateToken, async (req, res) => {
  try {
    const setupValue = await resolverValue.updateSetupValue(Number(req.params.valueId), req.body.value);
    if (!setupValue) {
        throw new Error();
    }
    res.json(setupValue);
  } catch (error) {
    res.status(400).json({ message: 'Invalid value' });
  }
});

/**
 * @swagger
 * /api/user/setup/{id}/values/{valueId}:
 *   delete:
 *     summary: Delete a parameter value from a setup
 *     tags:
 *       - Setup Values
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *       - name: valueId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Parameter value deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Value deleted"
 *       400:
 *         description: Invalid request
 */
router.delete('/setup/:id/values/:valueId', authenticateToken, async (req, res) => {
    await resolverValue.deleteSetupValue(Number(req.params.valueId));
    res.json({ message: 'Value deleted' });
});

export default router;

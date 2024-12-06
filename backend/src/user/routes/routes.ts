import express from 'express';
import { hashPassword } from '../../utils/hash';
import { UserRepository } from '../repository/repositoryPostgreSQL';
import { authenticateToken, authorizeAdmin } from '../../middleware/auth';

const adminRouter = express.Router();
const userRepository = new UserRepository();

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *                   email:
 *                     type: string
 *                     example: user@example.com
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   displayName:
 *                     type: string
 *                     example: JohnnyD
 *                   racingNumber:
 *                     type: integer
 *                     example: 42
 *                   isAdmin:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: An error occurred
 */
adminRouter.get('/users', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const users = await userRepository.findAllUsers();
        res.json(users.map((user) => ({ 
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            racingNumber: user.racingNumber,
            isAdmin: user.isAdmin,
        })));
    } catch (error: any) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Add a new user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - racingNumber
 *               - displayName
 *               - defaultPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               racingNumber:
 *                 type: integer
 *                 example: 42
 *               displayName:
 *                 type: string
 *                 example: JohnnyD
 *               defaultPassword:
 *                 type: string
 *                 example: "password123"
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 displayName:
 *                   type: string
 *                   example: JohnnyD
 *                 racingNumber:
 *                   type: integer
 *                   example: 42
 *                 isAdmin:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: An error occurred
 */
adminRouter.post('/users', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { email, firstName, lastName, racingNumber, displayName, isAdmin, defaultPassword } = req.body;

        const passwordHash = await hashPassword(defaultPassword);

        if (!email || !firstName || !lastName || !racingNumber || !displayName) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }            

        const newUser = await userRepository.createUser({
            email,
            firstName,
            displayName,
            lastName,
            racingNumber,
            passwordHash,
            isAdmin: isAdmin ?? false,
        });

        res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            displayName: newUser.displayName,
            racingNumber: newUser.racingNumber,
            isAdmin: newUser.isAdmin,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Edit an existing user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               displayName:
 *                 type: string
 *                 example: JaneS
 *               racingNumber:
 *                 type: integer
 *                 example: 24
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: newuser@example.com
 *                 firstName:
 *                   type: string
 *                   example: Jane
 *                 lastName:
 *                   type: string
 *                   example: Smith
 *                 displayName:
 *                   type: string
 *                   example: JaneS
 *                 racingNumber:
 *                   type: integer
 *                   example: 24
 *                 isAdmin:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred
 */
adminRouter.put('/users/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        delete req.body.user;
        const updatedData = req.body;
        console.log(updatedData);
        console.log(id);
        // check if isAdmin is a boolean and change it the default value if not
        if (typeof updatedData.isAdmin !== 'boolean') {
            if (updatedData.isAdmin === 'true') {
                updatedData.isAdmin = true;
            } else {
                updatedData.isAdmin = false;
            }
        }
        const updatedUser = await userRepository.updateUser(id, updatedData);

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            displayName: updatedUser.displayName,
            racingNumber: updatedUser.racingNumber,
            isAdmin: updatedUser.isAdmin,
        })
    } catch (error: any) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       500:
 *         description: An error occurred
 */
adminRouter.delete('/users/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        await userRepository.deleteUser(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

export default adminRouter;

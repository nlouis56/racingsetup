import express from 'express';
import { hashPassword } from '../../utils/hash';
import { UserRepository } from '../repository/repositoryPostgreSQL';
import { authenticateToken, authorizeAdmin } from '../../middleware/auth';

const adminRouter = express.Router();
const userRepository = new UserRepository();

// GET Users
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

// ADD New User
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

// EDIT User
adminRouter.put('/users/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        delete req.body.user;
        const updatedData = req.body;
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

// DELETE User
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

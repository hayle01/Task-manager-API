import express from 'express';
import { login, registerUser } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';
import { validateZod } from '../middlewares/validateZod.js';
import { createUserSchema } from '../schemas/userSchemas.js';
const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', validateZod(createUserSchema), registerUser);
router.post('/login', login);

// protecred routes
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;
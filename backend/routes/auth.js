import express from 'express';
import { login, registerUser } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';
import { validateZod } from '../middlewares/validateZod.js';
import { createUserSchema } from '../schemas/userSchemas.js';
const router = express.Router();

router.post('/register', validateZod(createUserSchema), registerUser);
router.post('/login', login);

router.get('/me', protect, (req, res) => {
    console.log("req.user", req.user)
    res.json(req.user)
})

// protected routes
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;
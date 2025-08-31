import express from 'express';
const router = express.Router();
import { getUsers, getUserinfo, createUser, updateUser} from '../controllers/users.js';

router.get('/', getUsers);
router.get('/:id', getUserinfo);
router.post('/create', createUser);
router.put('/update/:id', updateUser);

export default router;
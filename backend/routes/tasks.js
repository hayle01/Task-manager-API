import express from 'express';
import { createTask, deleteTask, getMyTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middlewares/auth.js';
import { validateZod } from '../middlewares/validateZod.js';
import { taskValidationSchema } from '../schemas/taskSchema.js';

const router = express.Router();

router.get('/', protect, getMyTasks);
router.post('/', protect, validateZod(taskValidationSchema), createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);


export default router;

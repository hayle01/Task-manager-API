import express from 'express';
import {protect} from '../middlewares/auth.js';
import { createTask, deleteTask, getMyTasks, updateTask } from '../controllers/taskController.js';
import { taskValidationSchema } from '../schemas/taskSchema.js';
import { validateZod } from '../middlewares/validateZod.js';

const router = express.Router();

//router.use(protect);
/**
 * @swagger
 * /tasks/my-tasks:
 *  get:
 *    summary: Get tasks for the authenticated user
 *    tags: [Tasks]
 *    security:
 *         - bearerAuth: []
 *    responses:
 *           200:
 *              description: List of tasks
 *  
 */
router.get('/my-tasks', getMyTasks);
router.post('/', protect, validateZod(taskValidationSchema), createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);





export default router;
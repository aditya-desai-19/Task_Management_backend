import express from 'express';
import { addTask, getTasks, getTaskById, updateTaskById, deleteTaskById } from '../controllers/task.controllers.js';

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', addTask);
taskRouter.get('/:id', getTaskById);
taskRouter.put('/:id', updateTaskById);
taskRouter.delete('/:id', deleteTaskById);

export default taskRouter;

import Task from "../models/tasks.js";

export const createTask = async (req, res, next) => {
    try {
        const {title, description, status, dueDate } = req.body;

        const task = {
            title,
            description,
            status: status || 'pending',
            dueDate,
            createdBy: req.user?._id
        }
        const saved = await Task.create({...task});
        return res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
}

// get my tasks
export const getMyTasks = async (req, res, next) => {
    try {
        // const tasks = await Task.find({createdBy: req.user._id});
        const tasks = await Task.find({}).sort({createdAt: -1});
        return res.status(200).json(tasks);
    } catch (error) {
        next(error)
    }
}

// update task
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findOneAndUpdate(
            {_id: id, createdBy: req.user._id},
            req.body,
            {new: true});
        if(!updatedTask) {
            return res.status(404).json({message: 'Task not found'});
        }
        return res.status(200).json(updatedTask);       
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
         const { id } = req.params;
        const task = await Task.findByIdAndDelete({_id: id, createdBy: req.user._id});
        if(!task) return res.status(404).json({message: 'Task not found'});
        return res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        next(error)
    }
}
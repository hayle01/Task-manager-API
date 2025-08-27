import mongoose from "mongoose";
import { required } from "zod/mini";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: String,
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;
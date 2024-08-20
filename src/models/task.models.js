import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: "NOTSTARTED"
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.ObjectId, 
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema);
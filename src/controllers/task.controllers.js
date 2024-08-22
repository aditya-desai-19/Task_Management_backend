import { Task } from "../models/task.models.js";

const addTask = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        if(!name || !status || !req.user) {
            return res.status(400).json({ msg: "Bad request" });
        }

        const task = new Task({
            name: name,
            description: description,
            status: status,
            user: req.user.user.id
        })

        await task.save();

        return res.status(201).json({ msg: "Successfully added task", task });
    } catch (error) {
        return res.status(500).json({ msg: "Some error occurred" });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.user.id});
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ msg: "Some error occurred" });
    }
}

const getTaskById = async (req, res) => { 
    try {
        if(!req.params.id) {
            return res.status(400).json({ msg: "Bad request" });
        }

        const { id } = req.params;
        const task = await Task.findById({ _id: id });

        if(!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
}

const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;

        if(!id) {
            return res.status(400).json({ msg: "Bad request" });
        }

        if(!name || !description || !status) {
            return res.status(400).json({ msg: "Bad request" });
        }

        const task = await Task.findById({ _id: id });
        
        if(!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        task.name = name || task.name;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();

        return res.status(200).json({ msg: "Task updated successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;  

        if(!id) {
            return res.status(400).json({ msg: "Bad request" });
        }

        const task = await Task.findById({ _id: id });

        if(!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        task.deleted = true;

        await task.save();
        
        return res.status(200).json({ msg: "Successfully deleted the task" });
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
}

export { addTask, getTasks, getTaskById, updateTaskById, deleteTaskById }
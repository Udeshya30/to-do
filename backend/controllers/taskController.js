const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title } = req.body;
    const task = await Task.create({ title, user: req.user._id });
    res.status(201).json(task);
};

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

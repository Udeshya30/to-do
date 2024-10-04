import React, { useEffect, useState } from 'react';
import { createTask, getTasks, deleteTask, updateTask } from '../api';

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await getTasks(token);
            setTasks(data);
        };

        fetchTasks();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await createTask(token, title);
        setTasks([...tasks, data]);
        setTitle('');
    };

    const handleDelete = async (id) => {
        await deleteTask(token, id);
        setTasks(tasks.filter(task => task._id !== id));
    };

    const handleToggle = async (task) => {
        await updateTask(token, task._id, { completed: !task.completed });
        setTasks(tasks.map(t => (t._id === task._id ? { ...t, completed: !t.completed } : t)));
    };

    return (
        <div>
            <h2>Task List</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" required />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
                        <button onClick={() => handleToggle(task)}>Toggle</button>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

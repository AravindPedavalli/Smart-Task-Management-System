import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async () => {
    if (!taskText.trim()) return;
    try {
      await axios.post(
        '/api/tasks',
        { task: taskText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskText('');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter a task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((t, idx) => (
          <li key={idx}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDashboard;

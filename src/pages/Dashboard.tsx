import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id);
    if (!error) setTasks(data);
  };

  const addTask = async () => {
    if (!newTask) return;
    const { error } = await supabase.from('tasks').insert({ title: newTask, user_id: user.id });
    if (!error) setNewTask('');
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome, {user.email}</h1>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 my-2">{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
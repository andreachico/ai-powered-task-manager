import React, { useState, useEffect } from "react";
import { fetchAIDashboardTasks } from "./api/api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAIDashboardTasks = async () => {
      const tasksFromAI = await fetchAIDashboardTasks(); // Fetch AI-generated tasks
      if (tasksFromAI) {
        setTasks(tasksFromAI.split("\n")); // Split tasks by newline if returned as a string
      }
      setLoading(false);
    };

    getAIDashboardTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>AI-Powered Task Manager</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

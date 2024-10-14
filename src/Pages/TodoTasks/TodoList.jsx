import { useState, useEffect } from "react";
import { useApi } from "../../Api/api.js";
import Header from "../../components/Header.jsx";

export default function TodoList() {
  const taskApi = useApi("Tasks");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await taskApi.getAll();
      setTasks(allTasks);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      <h1>A list of all tasks:</h1>
      <div className="text-left">
        {tasks.map((task) => (
          <ul key={task.id}>
            <li className={task.completed ? "line-through" : ""}>
              {task.name}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

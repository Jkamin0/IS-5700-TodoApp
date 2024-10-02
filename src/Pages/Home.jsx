import { useState } from "react";
import { useApi } from "../Api/api";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function Home() {
  const todoApi = useApi("TodoLists");
  const taskApi = useApi("Tasks");
  const todoLists = todoApi.getAll();
  const [tasks, setTasks] = useState(taskApi.getAll());

  function toggleTaskCompletion(taskId) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
    taskApi.update(taskId, { ...taskToUpdate });
    setTasks(updatedTasks);
  }

  return (
    <div>
      <Header />
      <h1>Todo Lists</h1>
      <div className="text-left">
        {todoLists.map((todoList) => (
          <Accordion key={todoList.id}>
            <AccordionSummary>
              <p className="text-l font-bold">{todoList.name}</p>
            </AccordionSummary>
            <AccordionDetails>
              {tasks
                .filter((task) => task.listId === todoList.id)
                // sort the items by completed
                .sort((a, b) => a.completed - b.completed)
                .map((task) => (
                  <div key={task.id}>
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span className={task.completed ? "line-through" : ""}>
                      {task.name}
                    </span>
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

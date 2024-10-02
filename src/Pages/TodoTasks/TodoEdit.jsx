import { useState } from "react";
import { useApi } from "../../Api/api.js";
import Header from "../../components/Header.jsx";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function TodoEdit() {
  const [selectedTask, setSelectedTask] = useState(null);
  const taskApi = useApi("Tasks");
  const todoApi = useApi("TodoLists");
  const tasks = taskApi.getAll();
  const todoLists = todoApi.getAll();

  function handleSelect(taskId) {
    const task = taskApi.getById(taskId);
    setSelectedTask(task);
  }

  function handleUpdate() {
    if (selectedTask) {
      taskApi.update(selectedTask.id, {
        name: selectedTask.name,
        listId: selectedTask.listId,
        completed: selectedTask.completed,
      });
      setSelectedTask(null);
    }
  }

  return (
    <div>
      <Header />
      <h1>Edit Existing Task</h1>

      <Box display="flex" flexDirection="column">
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Select a task to edit</InputLabel>
          <Select
            value={selectedTask ? selectedTask.id : ""}
            onChange={(e) => handleSelect(e.target.value)}
            label="Select a task to edit"
          >
            <MenuItem value="">
              <em>Select a task to edit</em>
            </MenuItem>
            {tasks.map((task) => (
              <MenuItem key={task.id} value={task.id}>
                {task.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Edit task name"
          variant="outlined"
          value={selectedTask ? selectedTask.name : ""}
          onChange={(e) =>
            setSelectedTask((prev) => ({ ...prev, name: e.target.value }))
          }
          margin="normal"
          fullWidth
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Select list</InputLabel>
          <Select
            value={selectedTask ? selectedTask.listId : ""}
            onChange={(e) =>
              setSelectedTask((prev) => ({
                ...prev,
                listId: e.target.value,
              }))
            }
            label="Select a list"
            disabled={!selectedTask}
          >
            <MenuItem value="">
              <em>Select a list</em>
            </MenuItem>
            {todoLists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Task
        </Button>
      </Box>
    </div>
  );
}

import { useState } from "react";
import { useApi } from "../../Api/api.js";
import Header from "../../components/Header.jsx";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function TodoAdd() {
  const taskApi = useApi("Tasks");
  const todoApi = useApi("TodoLists");
  const [taskName, setTaskName] = useState("");
  const [selectedListId, setSelectedListId] = useState("");

  const todoLists = todoApi.getAll();

  function addTask() {
    if (taskName && selectedListId) {
      taskApi.create({
        name: taskName,
        listId: selectedListId,
        completed: false,
      });
      setTaskName("");
      setSelectedListId("");
    }
  }

  return (
    <div>
      <Header />
      <h1>Add a New Task</h1>

      <Box display="flex" flexDirection="column">
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Select a list to add to</InputLabel>
          <Select
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
            label="Select a list to add to"
          >
            <MenuItem value="">
              <em>Select a list to add to</em>
            </MenuItem>
            {todoLists.map((list) => (
              <MenuItem key={list.id} value={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Enter task name"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="normal"
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </Box>
    </div>
  );
}

import { useState } from "react";
import { useApi } from "../../Api/api.js";
import Header from "../../components/Header.jsx";
import { TextField, Button, Box } from "@mui/material";

export default function TodoListGroupAdd() {
  const todoApi = useApi("TodoLists");
  const [newTodoList, setNewTodoList] = useState("");

  function addTodo() {
    if (newTodoList) {
      todoApi.create({ name: newTodoList });
      setNewTodoList("");
    }
  }

  return (
    <div>
      <Header />
      <h1>Add a new list</h1>
      <Box display="flex" alignItems="center">
        <TextField
          label="Enter todo list name"
          variant="outlined"
          fullWidth
          value={newTodoList}
          onChange={(e) => setNewTodoList(e.target.value)}
          margin="normal"
        />
        <div className="p-2">
          <Button variant="contained" color="primary" onClick={addTodo}>
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
}

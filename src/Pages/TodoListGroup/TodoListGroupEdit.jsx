import { useState } from "react";
import { useApi } from "../../Api/api.js";
import Header from "../../components/Header.jsx";
import { TextField, Button, Box } from "@mui/material";

export default function TodoListGroupEdit() {
  const todoApi = useApi("TodoLists");
  const [todoLists, setTodoLists] = useState(todoApi.getAll());

  function updateTodoName(id, updatedName) {
    todoApi.update(id, { name: updatedName });
    setTodoLists(todoApi.getAll());
  }

  function handleInput(id, newName) {
    setTodoLists((prevLists) =>
      prevLists.map((todo) =>
        todo.id === id ? { ...todo, name: newName } : todo
      )
    );
  }

  return (
    <div>
      <Header />
      <h1>Edit current lists</h1>
      {todoLists.map((todo) => (
        <Box key={todo.id} display="flex" alignItems="center">
          <TextField
            label="Edit list name"
            variant="outlined"
            value={todo.name}
            fullWidth
            onChange={(e) => handleInput(todo.id, e.target.value)}
            margin="normal"
          />
          <div className="p-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateTodoName(todo.id, todo.name)}
            >
              Save
            </Button>
          </div>
        </Box>
      ))}
    </div>
  );
}

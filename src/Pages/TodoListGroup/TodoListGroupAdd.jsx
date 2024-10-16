import Header from "../../components/Header.jsx";
import { useApi } from "../../Api/api.js";
import { FormProvider, useForm } from "../../store/FormProvider.jsx";
import { UseStringInputReturn } from "../../store/UseStringInputReturn.jsx";
import { SubmitButton } from "../../components/SubmitButton.jsx";
import { Box } from "@mui/material";

export default function TodoListGroupAdd() {
  const todoApi = useApi("TodoLists");

  async function addTodo(formData) {
    const newTodoList = formData.todoItem;

    if (newTodoList) {
      await todoApi.create({ name: newTodoList });
    }
  }

  return (
    <div>
      <Header />
      <h1>Add a new list</h1>
      <Box display="flex" alignItems="center">
        <FormProvider onSubmit={addTodo}>
          <UseStringInputReturn label="Add New Todo" name="todoItem" />
          <SubmitButton>Add Todo List</SubmitButton>
        </FormProvider>
      </Box>
    </div>
  );
}

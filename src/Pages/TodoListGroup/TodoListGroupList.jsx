import { useApi } from "../../Api/api.js";
import Header from "../../components/Header.jsx";

export default function TodoListGroupList() {
  const todoApi = useApi("TodoLists");
  const todoLists = todoApi.getAll();

  return (
    <>
      <Header />
      <h1>All todo lists:</h1>
      <div className="text-left">
        {todoLists.map((todoList) => (
          <ul key={todoList.id}>
            <li>{todoList.name}</li>
          </ul>
        ))}
      </div>
    </>
  );
}

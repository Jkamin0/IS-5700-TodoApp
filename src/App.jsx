import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import TodoListGroupList from "./Pages/TodoListGroup/TodoListGroupList.jsx";
import TodoListGroupAdd from "./Pages/TodoListGroup/TodoListGroupAdd.jsx";
import TodoListGroupEdit from "./Pages/TodoListGroup/TodoListGroupEdit.jsx";
import TodoList from "./Pages/TodoTasks/TodoList.jsx";
import TodoAdd from "./Pages/TodoTasks/TodoAdd.jsx";
import TodoEdit from "./Pages/TodoTasks/TodoEdit.jsx";
import "./tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {/* Todo List Routes:  */}
        <Route
          path="/TodoListGroupList"
          element={<TodoListGroupList />}
        ></Route>
        <Route path="/TodoListGroupAdd" element={<TodoListGroupAdd />}></Route>
        <Route
          path="/TodoListGroupEdit"
          element={<TodoListGroupEdit />}
        ></Route>

        {/* Todo Tasks Routes:  */}
        <Route path="/TodoList" element={<TodoList />}></Route>
        <Route path="/TodoAdd" element={<TodoAdd />}></Route>
        <Route path="/TodoEdit" element={<TodoEdit />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

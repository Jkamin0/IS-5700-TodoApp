import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginContextProvider from "./store/loginContext.jsx";
import Home from "./Pages/Home.jsx";
import TodoListGroupList from "./Pages/TodoListGroup/TodoListGroupList.jsx";
import TodoListGroupAdd from "./Pages/TodoListGroup/TodoListGroupAdd.jsx";
import TodoListGroupEdit from "./Pages/TodoListGroup/TodoListGroupEdit.jsx";
import TodoList from "./Pages/TodoTasks/TodoList.jsx";
import TodoAdd from "./Pages/TodoTasks/TodoAdd.jsx";
import TodoEdit from "./Pages/TodoTasks/TodoEdit.jsx";
import Authenticate from "./Pages/Authenticate.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./tailwind.css";

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Routes>
          <Route path="/Authenticate" element={<Authenticate />} />
          <Route path="/TodoListGroupList" element={<TodoListGroupList />} />
          <Route path="/TodoList" element={<TodoList />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/TodoListGroupAdd"
            element={<ProtectedRoute element={<TodoListGroupAdd />} />}
          />
          <Route
            path="/TodoListGroupEdit"
            element={<ProtectedRoute element={<TodoListGroupEdit />} />}
          />
          <Route
            path="/TodoAdd"
            element={<ProtectedRoute element={<TodoAdd />} />}
          />
          <Route
            path="/TodoEdit"
            element={<ProtectedRoute element={<TodoEdit />} />}
          />
        </Routes>
      </Router>
    </LoginContextProvider>
  );
}

export default App;

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4">
      <nav>
        <div className="flex justify-center space-x-5">
          <p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
          </p>
          <p>
            <Link
              to="/TodoListGroupList"
              className="text-blue-500 hover:text-blue-700"
            >
              Todo List Group List
            </Link>
          </p>
          <p>
            <Link
              to="/TodoListGroupAdd"
              className="text-blue-500 hover:text-blue-700"
            >
              Add Todo List Group
            </Link>
          </p>
          <p>
            <Link
              to="/TodoListGroupEdit"
              className="text-blue-500 hover:text-blue-700"
            >
              Edit Todo List Group
            </Link>
          </p>
          <p>
            <Link to="/TodoList" className="text-blue-500 hover:text-blue-700">
              View Todo Lists
            </Link>
          </p>
          <p>
            <Link to="/TodoAdd" className="text-blue-500 hover:text-blue-700">
              Add Task
            </Link>
          </p>
          <p>
            <Link to="/TodoEdit" className="text-blue-500 hover:text-blue-700">
              Edit Task
            </Link>
          </p>
        </div>
      </nav>
    </header>
  );
}

import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react"; // Import useContext
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Acesse o estado darkMode

  function onSeeDatailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul
      className={clsx(
        "space-y-4 p-6 rounded-md shadow",
        darkMode ? "bg-gray-800 text-white" : "bg-slate-200"
      )}
    >
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={clsx(
              "text-left w-full p-2 rounded-md",
              darkMode ? "bg-gray-700 text-white" : "bg-slate-400 text-white",
              task.isCompleted && "line-through"
            )}
          >
            {task.title}
          </button>
          <Button
            onClick={() => onSeeDatailsClick(task)}
            className={clsx(
              "p-2 rounded-md text-white",
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-slate-400 hover:bg-slate-500"
            )}
          >
            <ChevronRightIcon />
          </Button>
          <button
            onClick={() => onDeleteTaskClick(task.id)}
            className={clsx(
              "p-2 rounded-md text-white",
              darkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-slate-400 hover:bg-slate-500"
            )}
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;

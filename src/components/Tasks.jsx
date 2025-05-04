import { ChevronRightIcon, TrashIcon, EditIcon, CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onStartEdit }) {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  function onSeeDatailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("dueDate", task.dueDate);
    query.set("barcode", task.barcode);
    navigate(`/task?${query.toString()}`);
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <div
            className={clsx(
              "w-full rounded-md shadow-md p-4 flex items-center justify-between",
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900",
              task.isCompleted ? "opacity-70" : undefined // Linha 24 modificada
            )}
          >
            <button
              onClick={() => onTaskClick(task.id)}
              className="flex-grow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {task.isCompleted && (
                    <CheckIcon
                      className={clsx(
                        "mr-2 inline-block",
                        task.isCompleted && "text-green-500"
                      )}
                      size={20}
                    />
                  )}
                  <span
                    className={task.isCompleted ? "line-through" : undefined}
                  >
                    {task.title}
                  </span>
                </div>
                {task.dueDate && (
                  <span className="text-sm opacity-70">
                    {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </button>
            <div className="flex gap-2 ml-2">
              <Button
                onClick={() => onSeeDatailsClick(task)}
                className={clsx(
                  "p-2 rounded-md text-white transition-transform duration-150 hover:scale-105",
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
                  "p-2 rounded-md text-white transition-transform duration-150 hover:scale-105",
                  darkMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-400 hover:bg-slate-500"
                )}
              >
                <TrashIcon />
              </button>
              {!task.isCompleted && (
                <button
                  onClick={() => onStartEdit(task)}
                  className={clsx(
                    "p-2 rounded-md text-white transition-transform duration-150 hover:scale-105",
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-400 hover:bg-slate-500"
                  )}
                >
                  <EditIcon />
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;

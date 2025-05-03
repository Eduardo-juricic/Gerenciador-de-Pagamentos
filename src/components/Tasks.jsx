import { ChevronRightIcon, TrashIcon, EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onStartEdit }) {
  // Receba onStartEdit como prop
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Acesse o estado darkMode

  function onSeeDatailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("dueDate", task.dueDate); // Passe a data para os detalhes
    navigate(`/task?${query.toString()}`);
  }

  // Função auxiliar para formatar a data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    return `${month}/${year}`;
  };

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
              "text-left w-full p-2 rounded-md flex items-center", // Mantemos o flex e items-center
              darkMode ? "bg-gray-700 text-white" : "bg-slate-400 text-white",
              task.isCompleted && "line-through",
              "justify-between" // Adicionamos justify-between novamente
            )}
          >
            <span>{task.title}</span>
            {task.dueDate && (
              <span className="text-sm opacity-70">
                {formatDate(task.dueDate)}
              </span>
            )}
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
          <button // Botão de editar
            onClick={() => onStartEdit(task)}
            className={clsx(
              "p-2 rounded-md text-white",
              darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-slate-400 hover:bg-slate-500"
            )}
          >
            <EditIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;

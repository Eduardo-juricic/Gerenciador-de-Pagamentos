import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import "./index.css";
import { v4 } from "uuid";
import { clsx } from "clsx"; // Importação do clsx

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [darkMode, setDarkMode] = useState(false); // Estado para Dark Mode

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newtask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newtask]);
  }

  return (
    <div
      className={clsx(
        "w-screen h-screen flex justify-center p-6 transition-colors duration-300",
        darkMode ? "bg-gray-900 text-white" : "bg-slate-500 text-gray-900"
      )}
    >
      <div className="w-[500px] space-y-4">
        {/* Botão para alternar o modo */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={clsx(
            "px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 absolute top-6 right-6",
            darkMode
              ? "bg-white text-gray-900 hover:bg-gray-200"
              : "bg-gray-800 text-white hover:bg-gray-600"
          )}
        >
          Alternar para {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>

        <h1
          className={clsx(
            "text-3xl font-bold text-center",
            darkMode ? "text-white" : "text-slate-100"
          )}
        >
          Gerenciador de Tarefas
        </h1>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;

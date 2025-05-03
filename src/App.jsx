import { useEffect, useState, useContext } from "react"; // Import useContext
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import "./index.css";
import { v4 } from "uuid";
import { clsx } from "clsx";
import { ThemeContext } from "../contexts/ThemeContext";
import EditTask from "./components/EditTask"; // Importe o componente EditTask

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Acesse o contexto
  const [isEditing, setIsEditing] = useState(false); // Novo estado para controlar a edição
  const [taskToEdit, setTaskToEdit] = useState(null); // Novo estado para armazenar a tarefa a ser editada

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

  function onAddTaskSubmit(title, description, dueDate) {
    const newtask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
      dueDate: dueDate,
    };
    setTasks([...tasks, newtask]);
  }

  const handleStartEdit = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  const handleSaveEdit = (id, newTitle, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: newTitle, description: newDescription }
        : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setTaskToEdit(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTaskToEdit(null);
  };

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
          onClick={toggleDarkMode} // Use a função do contexto
          className={clsx(
            "px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 absolute bottom-6 right-6",
            darkMode
              ? "bg-white text-gray-900 hover:bg-gray-200"
              : "bg-gray-800 text-white hover:bg-gray-600"
          )}
        >
          Alternar para {darkMode ? "Light Mode" : "Dark mode"}
        </button>

        <h1
          className={clsx(
            "text-3xl font-bold text-center",
            darkMode ? "text-white" : "text-slate-100"
          )}
        >
          Gerenciador de Contas
        </h1>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />

        {isEditing && taskToEdit && (
          <EditTask
            task={taskToEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        )}

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
          onStartEdit={handleStartEdit} // Passe a função para iniciar a edição
        />
      </div>
    </div>
  );
}

export default App;

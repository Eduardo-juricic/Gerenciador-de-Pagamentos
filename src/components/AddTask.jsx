import { useState, useContext } from "react"; // Import useContext
import Input from "./Input";
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { darkMode } = useContext(ThemeContext); // Acesse o estado darkMode do contexto

  return (
    <div
      className={clsx(
        "space-y-4 p-6 rounded-md shadow flex flex-col",
        darkMode ? "bg-gray-800 text-white" : "bg-slate-200"
      )}
    >
      <Input
        type="text"
        placeholder="Digite o titulo da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={clsx(
          darkMode ? "bg-gray-700 text-white border-gray-600" : ""
        )}
      />

      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={clsx(
          darkMode ? "bg-gray-700 text-white border-gray-600" : ""
        )}
      />
      <button
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Preencha o titulo e descrição da tarefa.");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className={clsx(
          "px-4 py-2 rounded-md font-medium",
          darkMode
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-slate-500 text-white hover:bg-slate-600"
        )}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;

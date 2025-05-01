import { useSearchParams } from "react-router-dom";
import { useContext } from "react"; // Import useContext
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Acesse o contexto
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div
      className={clsx(
        "h-screen w-screen flex justify-center items-center p-6 transition-colors duration-300",
        darkMode ? "bg-gray-900 text-white" : "bg-slate-500 text-gray-900"
      )}
    >
      {/* Botão para alternar o modo */}
      <button
        onClick={toggleDarkMode} // Use a função do contexto
        className={clsx(
          "px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 absolute top-6 right-6",
          darkMode
            ? "bg-white text-gray-900 hover:bg-gray-200"
            : "bg-gray-800 text-white hover:bg-gray-600"
        )}
      >
        Alternar para {darkMode ? "Modo Claro" : "Modo Escuro"}
      </button>
      <div className="w-[500px] space-y-4">
        <h1
          className={clsx(
            "text-3xl font-bold text-center",
            darkMode ? "text-white" : "text-slate-100"
          )}
        >
          Detalhes da Tarefa
        </h1>
        <div
          className={clsx(
            "p-4 rounded-md",
            darkMode ? "bg-gray-800" : "bg-slate-200" // Adapte as cores para o modo escuro
          )}
        >
          <h2
            className={clsx(
              "text-xl font-bold",
              darkMode ? "text-white" : "text-slate-600"
            )}
          >
            {title}
          </h2>
          <p className={clsx(darkMode ? "text-white" : "text-slate-600")}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;

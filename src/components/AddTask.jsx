import { useState, useContext } from "react"; // Import useContext
import Input from "./Input";
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { darkMode } = useContext(ThemeContext); // Acesse o estado darkMode do contexto

  const months = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index); // Próximos 10 anos

  return (
    <div
      className={clsx(
        "space-y-4 p-6 rounded-md shadow flex flex-col",
        darkMode ? "bg-gray-800 text-white" : "bg-slate-200"
      )}
    >
      <Input
        type="text"
        placeholder="Digite o titulo da conta"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={clsx(
          darkMode ? "bg-gray-700 text-white border-gray-600" : ""
        )}
      />

      <Input
        type="text"
        placeholder="Digite o valor"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={clsx(
          darkMode ? "bg-gray-700 text-white border-gray-600" : ""
        )}
      />

      <div className="flex gap-2">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={clsx(
            "px-2 py-1 rounded-md",
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-slate-300"
          )}
        >
          <option value="" disabled>
            Mês
          </option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={clsx(
            "px-2 py-1 rounded-md",
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-slate-300"
          )}
        >
          <option value="" disabled>
            Ano
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          if (!title.trim() || !description.trim() || !month || !year) {
            return alert("Preencha o titulo, valor e selecione o mês e ano.");
          }
          const dueDate = `${year}-${month}-01`; // Formate a data como YYYY-MM-DD (o dia não é relevante aqui)
          onAddTaskSubmit(title, description, dueDate); // Passe a data para a função de submit
          setTitle("");
          setDescription("");
          setMonth("");
          setYear("");
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

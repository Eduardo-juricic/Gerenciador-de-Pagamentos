import { useState, useContext } from "react";
import Input from "./Input";
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState(""); // Novo estado para o dia
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [barcode, setBarcode] = useState("");

  const { darkMode } = useContext(ThemeContext);

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
  const years = Array.from({ length: 10 }, (_, index) => currentYear + index);

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
          "border rounded-md py-2 px-3 w-full ",
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-gray-900 border-slate-300"
        )}
      />

      <Input
        type="text"
        placeholder="Digite o valor"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={clsx(
          "border rounded-md py-2 px-3 w-full",
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-gray-900 border-slate-300"
        )}
      />

      <Input
        type="text"
        placeholder="Código de barras (opcional)"
        value={barcode}
        onChange={(event) => setBarcode(event.target.value)}
        className={clsx(
          "border rounded-md py-2 px-3 w-full",
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-gray-900 border-slate-300"
        )}
      />

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Dia"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={clsx(
            "px-2 py-1 rounded-md w-1/4", // Ajuste a largura conforme necessário
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-900 border-slate-300"
          )}
          min="1"
          max="31"
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={clsx(
            "px-2 py-1 rounded-md flex-grow", // Ocupa o espaço restante
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
            "px-2 py-1 rounded-md w-1/3", // Ajuste a largura conforme necessário
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
          if (!title.trim() || !description.trim() || !month || !year || !day) {
            return alert(
              "Preencha o titulo, valor e selecione o dia, mês e ano."
            );
          }
          const dueDate = `${year}-${month}-${String(day).padStart(2, "0")}`; // Formato YYYY-MM-DD
          onAddTaskSubmit(title, description, dueDate, barcode);
          setTitle("");
          setDescription("");
          setDay("");
          setMonth("");
          setYear("");
          setBarcode("");
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

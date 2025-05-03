import { useState, useEffect } from "react";

function EditTask({ task, onSaveEdit, onCancelEdit }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [editDay, setEditDay] = useState(""); // Estado para o dia de edição
  const [editMonth, setEditMonth] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editBarcode, setEditBarcode] = useState(task.barcode || "");

  useEffect(() => {
    if (task && task.dueDate) {
      const [year, month, day] = task.dueDate.split("-"); // Captura o dia também
      setEditDay(day);
      setEditMonth(month);
      setEditYear(year);
    } else {
      setEditDay("");
      setEditMonth("");
      setEditYear("");
    }
    setEditBarcode(task.barcode || "");
  }, [task]);

  const handleSave = () => {
    onSaveEdit(
      task.id,
      title,
      description,
      `${editYear}-${editMonth}-${String(editDay).padStart(2, "0")}`, // Inclui e formata o dia
      editBarcode
    );
  };

  const months = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Fev" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Abr" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Ago" },
    { value: "09", label: "Set" },
    { value: "10", label: "Out" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dez" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i).map(
    (year) => ({
      value: String(year),
      label: String(year),
    })
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex: 1000 }}
    >
      <div
        className="p-6 rounded-md shadow-md w-96"
        style={{ backgroundColor: "white" }}
      >
        <h2 className="text-xl font-semibold mb-4">Editar Tarefa</h2>
        <div className="mb-4">
          <label
            htmlFor="edit-title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Título:
          </label>
          <input
            type="text"
            id="edit-title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="edit-description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Descrição:
          </label>
          <textarea
            id="edit-description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="edit-barcode"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Código de barras:
          </label>
          <input
            type="text"
            id="edit-barcode"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={editBarcode}
            onChange={(e) => setEditBarcode(e.target.value)}
            placeholder="Código de barras"
          />
        </div>
        <div className="flex gap-2 items-center mb-4">
          <div className="flex-grow">
            <label
              htmlFor="edit-day"
              className="block text-sm font-medium text-gray-700"
            >
              Dia:
            </label>
            <input
              type="number"
              id="edit-day"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editDay}
              onChange={(e) => setEditDay(e.target.value)}
              placeholder="DD"
              min="1"
              max="31"
            />
          </div>
          <div className="flex-grow">
            <label
              htmlFor="edit-month"
              className="block text-sm font-medium text-gray-700"
            >
              Mês:
            </label>
            <select
              id="edit-month"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editMonth}
              onChange={(e) => setEditMonth(e.target.value)}
            >
              <option value="">Mês</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-grow">
            <label
              htmlFor="edit-year"
              className="block text-sm font-medium text-gray-700"
            >
              Ano:
            </label>
            <select
              id="edit-year"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editYear}
              onChange={(e) => setEditYear(e.target.value)}
            >
              <option value="">Ano</option>
              {years.map((y) => (
                <option key={y.value} value={y.value}>
                  {y.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Salvar
          </button>
          <button
            onClick={onCancelEdit}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;

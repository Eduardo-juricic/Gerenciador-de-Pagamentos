import { useState } from "react";

function EditTask({ task, onSaveEdit, onCancelEdit }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onSaveEdit(task.id, title, description);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
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

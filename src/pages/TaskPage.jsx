import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react"; // Import useState
import { ThemeContext } from "../../contexts/ThemeContext";
import { clsx } from "clsx";
import {
  Banknote,
  Landmark,
  CreditCard,
  PiggyBank,
  ChevronLeftIcon,
  Copy, // Importe o ícone de copiar
} from "lucide-react";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const dueDate = searchParams.get("dueDate");
  const barcode = searchParams.get("barcode"); // Recupera o barcode
  const [copySuccess, setCopySuccess] = useState(""); // Estado para feedback de cópia

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    return `${month}/${year}`;
  };

  const handleCopyToClipboard = () => {
    if (barcode) {
      navigator.clipboard
        .writeText(barcode)
        .then(() => {
          setCopySuccess("Código de barras copiado!");
          setTimeout(() => setCopySuccess(""), 2000); // Limpa a mensagem após 2 segundos
        })
        .catch((err) => {
          console.error("Falha ao copiar código de barras: ", err);
          setCopySuccess("Falha ao copiar!");
          setTimeout(() => setCopySuccess(""), 2000);
        });
    } else {
      setCopySuccess("Nenhum código de barras para copiar.");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  return (
    <div
      className={clsx(
        "h-screen w-screen flex justify-center items-center p-6 transition-colors duration-300",
        darkMode ? "bg-gray-900 text-white" : "bg-slate-500 text-gray-900"
      )}
    >
      {/* Botão para alternar o modo */}
      <button
        onClick={toggleDarkMode}
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
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <h1
            className={clsx(
              "text-3xl font-bold text-center",
              darkMode ? "text-white" : "text-slate-100"
            )}
          >
            Detalhes da Conta
          </h1>
        </div>
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
          {dueDate && (
            <p
              className={clsx(
                "text-sm opacity-70",
                darkMode ? "text-white" : "text-slate-600"
              )}
            >
              Vencimento: {formatDate(dueDate)}
            </p>
          )}

          {barcode && (
            <div className="mt-4">
              <p
                className={clsx(
                  "font-semibold",
                  darkMode ? "text-white" : "text-slate-600"
                )}
              >
                Código de barras:
              </p>
              <button
                onClick={handleCopyToClipboard}
                className={clsx(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-gray-900"
                )}
              >
                {barcode} <Copy size={16} />
              </button>
              {copySuccess && (
                <p
                  className={clsx(
                    "text-xs mt-1",
                    copySuccess.includes("Falha")
                      ? "text-red-500"
                      : "text-green-500"
                  )}
                >
                  {copySuccess}
                </p>
              )}
            </div>
          )}
          {!barcode && (
            <p
              className={clsx(
                "mt-4 text-sm opacity-70",
                darkMode ? "text-white" : "text-slate-600"
              )}
            >
              Nenhum código de barras cadastrado.
            </p>
          )}

          <div className="flex flex-col space-y-3 mt-6">
            <a
              href="https://play.google.com/store/search?q=Nubank&c=apps"
              className="flex items-center gap-2 w-40 px-3 py-1.5 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors duration-300"
            >
              <CreditCard size={18} />
              Nubank
            </a>

            <a
              href="https://play.google.com/store/search?q=Banco+Inter&c=apps"
              className="flex items-center gap-2 w-40 px-3 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors duration-300"
            >
              <Banknote size={18} />
              Banco Inter
            </a>

            <a
              href="https://play.google.com/store/search?q=Ita%C3%BA&c=apps"
              className="flex items-center gap-2 w-40 px-3 py-1.5 bg-[#FF6600] text-white text-sm rounded hover:bg-[#e65c00] transition-colors duration-300"
            >
              <PiggyBank size={18} />
              Itaú
            </a>

            <a
              href="https://play.google.com/store/search?q=Banco+do+Brasil&c=apps"
              className="flex items-center gap-2 w-40 px-3 py-1.5 bg-yellow-400 text-gray-900 text-sm rounded hover:bg-yellow-300 transition-colors duration-300"
            >
              <Landmark size={18} />
              Banco do Brasil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;

import { createContext, useState, useEffect } from "react";

// 1. Criação do Contexto:
// Cria um objeto de contexto que conterá o estado do tema e a função para alterá-lo.
export const ThemeContext = createContext({
  darkMode: false, // Valor padrão: modo claro desativado
  toggleDarkMode: () => {}, // Função vazia padrão para alternar o tema
});

// 2. Criação do Provider:
// O Provider é um componente que fornece o contexto para seus filhos.
export const ThemeProvider = ({ children }) => {
  // Estado para controlar o modo escuro
  const [darkMode, setDarkMode] = useState(() => {
    // Tenta obter a preferência de tema do localStorage
    const storedTheme = localStorage.getItem("darkMode");
    // Retorna true se 'true' estiver armazenado, senão false (padrão)
    return storedTheme === "true" || false;
  });

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode); // Inverte o estado anterior
  };

  // 3. Efeito para persistir a preferência de tema no localStorage:
  // Este useEffect roda sempre que 'darkMode' muda, salvando a preferência.
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // 4. Retorno do Provider:
  // Envolve os componentes filhos com o Context.Provider e passa o valor do contexto.
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

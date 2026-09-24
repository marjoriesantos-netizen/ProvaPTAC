import { useEffect, useState } from "react";
import FormularioIdeia from "./components/FormularioIdeia";
import ListaIdeias from "./components/ListaIdeias";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [ideiaEmEdicao, setIdeiaEmEdicao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function carregarIdeias() {
      try {
        setCarregando(true);
        setErro("");

        const response = await fetch(`${API_URL}?_limit=15`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar ideias.");
        }

        const dados = await response.json();

        const titulos = [
          "Criar jogos",
          "Criar aplicativo para organizar estudos",
          "Criar lista de tarefas",
          "Criar aplicativo de estudo",
          "Criar aplicativo de exercícios",
          "Criar agenda de estudos",
          "Criar plataforma para compartilhar projetos",
        ];

        const ideiasComTitulos = dados.map((ideia, index) => ({
          ...ideia,
          title: titulos[index],
        }));

        setIdeias(ideiasComTitulos);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErro("Não foi possível conectar à API.");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarIdeias();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Banco de Ideias</h1>
        <p>Organize suas ideias de projetos</p>
      </header>

      <main className="conteudo">
        <aside className="lateral">
          <FormularioIdeia
            titulo={titulo}
            setTitulo={setTitulo}
            ideiaEmEdicao={ideiaEmEdicao}
            setIdeiaEmEdicao={setIdeiaEmEdicao}
            setIdeias={setIdeias}
          />
        </aside>

        <section className="lista-container">
          {carregando && (
            <p className="mensagem">Carregando ideias...</p>
          )}

          {erro && <p className="erro">{erro}</p>}

          {!carregando && !erro && ideias.length === 0 && (
            <p className="mensagem">
              Nenhuma ideia por aqui — que tal cadastrar a primeira?
            </p>
          )}

          {!carregando && !erro && ideias.length > 0 && (
            <ListaIdeias
              ideias={ideias}
              setIdeias={setIdeias}
              setTitulo={setTitulo}
              setIdeiaEmEdicao={setIdeiaEmEdicao}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

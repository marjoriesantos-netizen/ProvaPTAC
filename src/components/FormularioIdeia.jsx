const API_URL = "https://jsonplaceholder.typicode.com/todos";

function FormularioIdeia({
  titulo,
  setTitulo,
  ideiaEmEdicao,
  setIdeiaEmEdicao,
  setIdeias,
}) {
  async function handleSubmit(event) {
    event.preventDefault();

    if (!titulo.trim()) {
      return;
    }

    try {
      if (ideiaEmEdicao) {
        const response = await fetch(`${API_URL}/${ideiaEmEdicao.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: ideiaEmEdicao.userId,
            id: ideiaEmEdicao.id,
            title: titulo,
            completed: ideiaEmEdicao.completed,
          }),
        });

        if (!response.ok) {
          throw new Error("Erro ao editar ideia.");
        }

        const ideiaAtualizada = await response.json();

        setIdeias((ideiasAtuais) =>
          ideiasAtuais.map((ideia) =>
            ideia.id === ideiaEmEdicao.id
              ? ideiaAtualizada
              : ideia
          )
        );

        cancelarEdicao();
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          title: titulo,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar ideia.");
      }

      const novaIdeia = await response.json();

      setIdeias((ideiasAtuais) => [novaIdeia, ...ideiasAtuais]);
      setTitulo("");
    } catch (error) {
      alert("Não foi possível realizar a operação.");
    }
  }

  function cancelarEdicao() {
    setIdeiaEmEdicao(null);
    setTitulo("");
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>{ideiaEmEdicao ? "Editar ideia" : "Nova ideia"}</h2>

      <label htmlFor="titulo">Título da ideia</label>

      <input
        id="titulo"
        type="text"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
        placeholder="Digite sua ideia..."
      />

      <button type="submit">
        {ideiaEmEdicao ? "Salvar" : "Adicionar ideia"}
      </button>

      {ideiaEmEdicao && (
        <button
          type="button"
          className="botao-cancelar"
          onClick={cancelarEdicao}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default FormularioIdeia;
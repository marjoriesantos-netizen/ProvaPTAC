const API_URL = "https://jsonplaceholder.typicode.com/todos";

function CartaoIdeia({
  ideia,
  setIdeias,
  setTitulo,
  setIdeiaEmEdicao,
}) {
  async function alternarStatus() {
    try {
      const novaSituacao = !ideia.completed;

      const response = await fetch(`${API_URL}/${ideia.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: ideia.userId,
          id: ideia.id,
          title: ideia.title,
          completed: novaSituacao,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status.");
      }

      const ideiaAtualizada = await response.json();

      setIdeias((ideiasAtuais) =>
        ideiasAtuais.map((item) =>
          item.id === ideia.id ? ideiaAtualizada : item
        )
      );
    } catch (error) {
      alert("Não foi possível atualizar o status.");
    }
  }

  function editar() {
    setTitulo(ideia.title);
    setIdeiaEmEdicao(ideia);
  }

  async function excluir() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta ideia?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${ideia.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir ideia.");
      }

      setIdeias((ideiasAtuais) =>
        ideiasAtuais.filter((item) => item.id !== ideia.id)
      );
    } catch (error) {
      alert("Não foi possível excluir a ideia.");
    }
  }

  return (
    <article className={`cartao ${ideia.completed ? "executada" : ""}`}>
      <div className="cartao-conteudo">
        <h3>{ideia.title}</h3>

        <span className="status">
          {ideia.completed ? "Executada" : "Pendente"}
        </span>
      </div>

      <div className="acoes">
        <button onClick={alternarStatus}>
          {ideia.completed ? "Marcar pendente" : "Marcar executada"}
        </button>

        <button onClick={editar}>Editar</button>

        <button className="botao-excluir" onClick={excluir}>
          Excluir
        </button>
      </div>
    </article>
  );
}

export default CartaoIdeia;
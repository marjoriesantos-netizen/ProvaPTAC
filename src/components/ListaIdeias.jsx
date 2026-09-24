import CartaoIdeia from "./CartaoIdeia";

function ListaIdeias({
  ideias,
  setIdeias,
  setTitulo,
  setIdeiaEmEdicao,
}) {
  return (
    <div className="lista-ideias">
      {ideias.map((ideia) => (
        <CartaoIdeia
          key={ideia.id}
          ideia={ideia}
          setIdeias={setIdeias}
          setTitulo={setTitulo}
          setIdeiaEmEdicao={setIdeiaEmEdicao}
        />
      ))}
    </div>
  );
}

export default ListaIdeias;
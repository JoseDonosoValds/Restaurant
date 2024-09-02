import React from "react";

const Mesas = ({ mesas, seleccionarMesa }) => {
  return (
    <div>
      <h1>Selección de Mesas</h1>
      <ul>
        {mesas.map((mesa) => (
          <li key={mesa.id}>
            <button onClick={() => seleccionarMesa(mesa.id)}>Mesa {mesa.numero}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mesas;
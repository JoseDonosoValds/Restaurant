import React from "react";

const Pedido = ({ mesa, opciones, cerrarPedido, formData, infInput, addToCart }) => {
  return (
    <div className="popup">
      <h2>Pedido para la Mesa {mesa.numero}</h2>
      <form onSubmit={(e) => addToCart(e, mesa.id)}>
        <label htmlFor={`mesa-${mesa.id}`}>
          Mesa:
          <input
            id={`mesa-${mesa.id}`}
            type="text"
            name="mesa"
            onChange={(e) => infInput(e, mesa.id)}
            value={formData[mesa.id]?.mesa || ""}
          />
        </label>
        <label htmlFor={`id-${mesa.id}`}>
          ID:
          <input
            id={`id-${mesa.id}`}
            type="text"
            name="id"
            onChange={(e) => infInput(e, mesa.id)}
            value={formData[mesa.id]?.id || ""}
          />
        </label>
        <label htmlFor={`nombre-${mesa.id}`}>
          Nombre:
          <input
            id={`nombre-${mesa.id}`}
            type="text"
            name="nombre"
            onChange={(e) => infInput(e, mesa.id)}
            value={formData[mesa.id]?.nombre || ""}
          />
        </label>
        <label htmlFor={`comida-${mesa.id}`}>
          Comida:
          <input
            id={`comida-${mesa.id}`}
            type="text"
            name="comida"
            onChange={(e) => infInput(e, mesa.id)}
            value={formData[mesa.id]?.comida || ""}
          />
        </label>
        <label htmlFor={`bebida-${mesa.id}`}>
          Bebida:
          <input
            id={`bebida-${mesa.id}`}
            type="text"
            name="bebida"
            onChange={(e) => infInput(e, mesa.id)}
            value={formData[mesa.id]?.bebida || ""}
          />
        </label>
        <ul>
          {opciones.map((opcion) => (
            <li key={opcion}>
              <input type="checkbox" />
              <span>{opcion}</span>
            </li>
          ))}
        </ul>
        <button type="submit">Guardar Pedido</button>
        <button onClick={cerrarPedido}>Cancelar</button>
      </form>
    </div>
  );
};

export default Pedido;
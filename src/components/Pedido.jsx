import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pedido = ({ mesa, opciones, cerrarPedido, formData, infInput, addToCart }) => {
  return (
    <div className="popup">
      <div className="card">
        <div className="card-header">
          <h2>Pedido para la Mesa {mesa.numero}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => addToCart(e, mesa.id)}>
            <div className="mb-3">
              <label htmlFor={`mesa-${mesa.id}`} className="form-label">
                Mesa:
              </label>
              <input
                id={`mesa-${mesa.id}`}
                type="text"
                name="mesa"
                onChange={(e) => infInput(e, mesa.id)}
                value={formData[mesa.id]?.mesa || ""}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`id-${mesa.id}`} className="form-label">
                ID:
              </label>
              <input
                id={`id-${mesa.id}`}
                type="text"
                name="id"
                onChange={(e) => infInput(e, mesa.id)}
                value={formData[mesa.id]?.id || ""}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`nombre-${mesa.id}`} className="form-label">
                Nombre:
              </label>
              <input
                id={`nombre-${mesa.id}`}
                type="text"
                name="nombre"
                onChange={(e) => infInput(e, mesa.id)}
                value={formData[mesa.id]?.nombre || ""}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`comida-${mesa.id}`} className="form-label">
                Comida:
              </label>
              <input
                id={`comida-${mesa.id}`}
                type="text"
                name="comida"
                onChange={(e) => infInput(e, mesa.id)}
                value={formData[mesa.id]?.comida || ""}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`bebida-${mesa.id}`} className="form-label">
                Bebida:
              </label>
              <input
                id={`bebida-${mesa.id}`}
                type="text"
                name="bebida"
                onChange={(e) => infInput(e, mesa.id)}
                value={formData[mesa.id]?.bebida || ""}
                className="form-control"
              />
            </div>
            <ul className="list-unstyled mb-3">
              {opciones.map((opcion) => (
                <li key={opcion}>
                  <input type="checkbox" />
                  <span>{opcion}</span>
                </li>
              ))}
            </ul>
            <button type="submit" className="btn btn-primary">
              Guardar Pedido
            </button>
            <button onClick={cerrarPedido} className="btn btn-secondary ms-2">
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
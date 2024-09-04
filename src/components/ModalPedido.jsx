import React, { useEffect, useState } from "react";
import "../styles/modal.css";
import axios from "axios";

const ModalPedido = ({ isOpen, onClose, mesa, onUpdateMesa }) => {
  const endpointVerPedido = "http://localhost:4000/api/restaurant/verPedido";

  const [pedido, setPedido] = useState(null);
  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    const fetchPedido = async () => {
      if (mesa) {
        console.log("ID de mesa:", mesa);  
        try {
          const { data } = await axios.get(endpointVerPedido, {
            params: { id_mesa: mesa },
          });
          console.log(data);
          setPedido(data.pedido);
          calcularTotalPedido(data.pedido);
        } catch (error) {
          console.error("Error al obtener el pedido:", error);
        }
      }
    };
  
    fetchPedido();
  }, [mesa]);

  const calcularTotalPedido = (pedido) => {
    if (pedido) {
      let total = 0;
      pedido.comida.forEach((item) => {
        total += item.price * item.cantidad;
      });
      pedido.bebida.forEach((item) => {
        total += item.price * item.cantidad;
      });
      setTotalPedido(total);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>Detalles del Pedido</h2>
        {pedido ? (
          <>
            <h3>ID Pedido: {pedido.id_pedido}</h3>
            <h4>Comida:</h4>
            <div>
      
              {pedido.comida.map((item, index) => (
                <div key={index}>
                  <p>{item.name_product} - Cantidad: {item.cantidad} - Precio: ${item.price}</p>
                </div>
              ))}
            </div>
            <h4>Bebida:</h4>
            <div>
              {pedido.bebida.map((item, index) => (
                <div key={index}>
                  <p>{item.name_product} - Cantidad: {item.cantidad} - Precio: ${item.price}</p>
                </div>
              ))}
            </div>
            <div>
              <h4>Total: ${totalPedido}</h4>
            </div>
          </>
        ) : (
          <p>No hay pedido para esta mesa.</p>
        )}
      </div>
    </div>
  );
};

export default ModalPedido;

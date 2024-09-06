import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Modal from "./components/Modal";
import ModalPedido from "./components/ModalPedido";

export const Restaurant=()=> {
  const endpointMesa = "http://localhost:4000/api/restaurant/mesa";
  const endpointLiberarMesa = "http://localhost:4000/api/restaurant/libre";
  const endpointPorPagar = "http://localhost:4000/api/restaurant/entregado";

  const [modals, setModals] = useState({});
  const [modalType, setModalType] = useState(null); 
  const [dataMesa, setDataMesa] = useState([]);
  const [mesaIdModal, setMesaIdModal] = useState(null); 

  useEffect(() => {
    fetchMesaData();
  }, []);

  const fetchMesaData = async () => {
    try {
      const response = await axios.get(endpointMesa);
      const sortedData = response.data.sort((a, b) => a.id_mesa - b.id_mesa); // Ordena las mesas por ID
      setDataMesa(sortedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const openModal = (index, type) => {
    setMesaIdModal(index);
    setModalType(type);
    setModals((prevModals) => ({
      ...prevModals,
      [index]: true,
    }));
  };

  const closeModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      [mesaIdModal]: false,
    }));
    setMesaIdModal(null);
    setModalType(null);
  };

  const updateMesaState = async () => {
    await fetchMesaData();
  };

  const handlePedidoEntregado = async (id_mesa) => {
    try {
      await axios.put(endpointPorPagar, {
        id_mesa,
      });
      await updateMesaState();
    } catch (error) {
      console.error("Error al marcar pedido como entregado:", error);
    }
  };

  const handlePagado = async (mesa_id) => {
    try {
      await axios.put(endpointLiberarMesa, {
        id_mesa: mesa_id,
      });
      await updateMesaState();
    } catch (error) {
      console.error("Error al marcar como pagado:", error);
    }
  };

  return (
    <div className="App">
      <div className="container-grid">
        {dataMesa?.map((mesa) => (
          <div key={mesa.id_mesa} className="card">
            <div className="card-image">
              <img src="../public/mesa2.png" alt="imagen de mesa con copas" />
            </div>
            <div className="card-info">
              <h5>{mesa.estado_mesa}</h5>
              <button
                className={`tomarPedido ${
                  mesa.estado_mesa === "pedido tomado" ? "disabled" : ""
                }`}
                onClick={() => openModal(mesa.id_mesa, "tomarPedido")}
                disabled={mesa.estado_mesa === "pedido tomado"}
              >
                Tomar pedido {mesa.id_mesa}
              </button>
            </div>
            <div className="card-buttons">
              <button
                className={`tomarPedido ${
                  mesa.estado_mesa === "Libre" ? "disabled" : ""
                }`}
                onClick={() => openModal(mesa.id_mesa, "verPedido")}
                disabled={mesa.estado_mesa === "Libre"}
              >
                Ver pedido
              </button>

              <button
                className={`tomarPedido ${
                  mesa.estado_mesa === "pedido tomado" ||
                  mesa.estado_mesa === "libre"
                    ? "disabled"
                    : ""
                }`}
                onClick={() => handlePagado(mesa.id_mesa)}
                disabled={
                  mesa.estado_mesa === "pedido tomado" ||
                  mesa.estado_mesa === "libre"
                }
              >
                Pagado
              </button>

              <button
                className="tomarPedido"
                onClick={() => handlePedidoEntregado(mesa.id_mesa)}
              >
                Pedido entregado
              </button>
            </div>
            <ModalPedido
              isOpen={modalType === "verPedido" && mesaIdModal === mesa.id_mesa}
              onClose={closeModal}
              mesa={mesaIdModal}
              onUpdateMesa={updateMesaState}
            />
            <Modal
              isOpen={
                modalType === "tomarPedido" && mesaIdModal === mesa.id_mesa
              }
              onClose={closeModal}
              mesa={mesaIdModal}
              onSubmit={() => {}} // Ajusta si es necesario
              onUpdateMesa={updateMesaState}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


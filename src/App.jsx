import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const endpointMesa = "http://localhost:4000/api/restaurant/mesa";
  const endpointLiberarMesa = "http://localhost:4000/api/restaurant/libre";
  const endpointPorPagar = "http://localhost:4000/api/restaurant/entregado";

  const [modals, setModals] = useState({});
  const [modalIndex, setModalIndex] = useState(null);
  const [dataMesa, setDataMesa] = useState([]);

  useEffect(() => {
    fetchMesaData(); // Obtiene los datos de las mesas al cargar el componente
  }, []);

  const fetchMesaData = async () => {
    try {
      const response = await axios.get(endpointMesa);
      console.log("Datos de la mesa:", response.data); // Verifica si id_pedido está presente
      setDataMesa(response.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const openModal = (index) => {
    setModalIndex(index);
    setModals((prevModals) => ({
      ...prevModals,
      [index]: true,
    }));
  };

  const closeModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalIndex]: false,
    }));
    setModalIndex(null);
  };

  const handleSubmit = (formData) => {
    console.log(formData);
  };

  const updateMesaState = async () => {
    await fetchMesaData();
  };

  const handlePedidoEntregado = async (id_mesa) => {
    console.log("ID de la mesa:", id_mesa); // Imprime el ID de la mesa

    try {
      await axios.put(endpointPorPagar, {
        id_mesa, // Envía el id_mesa en lugar del id_pedido
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
          <div key={mesa.id_mesa} className="container">
            <div className="contenedorImagen">
              <img src="../public/mesa2.png" alt="imagen de mesa con copas" />
            </div>
            <div>
              <div>
                <button
                  className="tomarPedido"
                  onClick={() => handlePagado(mesa.id_mesa)}
                >
                  Pagado
                </button>
              </div>
              <button
                className="tomarPedido"
                onClick={() => handlePedidoEntregado(mesa.id_mesa)}
              >
                Pedido entregado
              </button>
            </div>
            <button
              className="tomarPedido"
              onClick={() => openModal(mesa.id_mesa)}
            >
              Tomar pedido {mesa.id_mesa}
            </button>
            <h5>{mesa.estado_mesa}</h5>

            <Modal
              isOpen={modals[mesa.id_mesa]}
              onClose={closeModal}
              onSubmit={handleSubmit}
              mesa={mesa.id_mesa}
              onUpdateMesa={updateMesaState} // Pasa el callback al modal
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

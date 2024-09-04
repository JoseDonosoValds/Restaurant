import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const endpointMesa = "http://localhost:4000/api/restaurant/mesa";
  const [modals, setModals] = useState({});
  const [modalIndex, setModalIndex] = useState(null);
  const [dataMesa, setDataMesa] = useState([]);

  useEffect(() => {
    fetchMesaData(); // Obtiene los datos de las mesas al cargar el componente
  }, []);

  const fetchMesaData = async () => {
    try {
      const response = await axios.get(endpointMesa);
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
    await fetchMesaData(); // Vuelve a obtener los datos de las mesas
  };

  const handlePedidoEntregado = async (mesa_id) => {
    try {
      await axios.post("http://localhost:4000/api/restaurant/entregado", {
        mesa_id,
      });
      await updateMesaState(); // Actualiza el estado de las mesas después de marcar como entregado
    } catch (error) {
      console.error("Error al marcar pedido como entregado:", error);
    }
  };

  const handlePagado = async (mesa_id) => {
    try {
      await axios.post("http://localhost:4000/api/restaurant/pagado", {
        mesa_id,
      });
      await updateMesaState(); // Actualiza el estado de las mesas después de marcar como pagado
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

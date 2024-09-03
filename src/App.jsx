import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { HeaderComponent } from "./components/HeaderComponent";
import Modal from "./components/Modal";
import { Footer } from "./components/Footer";

function App() {
  const endpointMesa = "http://localhost:4000/api/restaurant/mesa";
  const [modals, setModals] = useState({});
  const [modalIndex, setModalIndex] = useState(null);
  const [dataMesa, setDataMesa] = useState([]);

  useEffect(() => {
    const getMesa = async () => {
      try {
        const response = await axios.get(endpointMesa);
        setDataMesa(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    getMesa();
  }, []);

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

  return (
    <div className="App">
      <HeaderComponent />
      <div className="container-grid">
        {dataMesa?.map((mesa) => (
          <div key={mesa.id_mesa} className="container">
            <h1>{mesa.name_mesa}</h1>
            <div className="contenedorImagen">
              <img src="../public/mesa2.png" alt="imagen de mesa con copas" />
            </div>
            <button onClick={() => openModal(mesa.id_mesa)}>
              Tomar pedido {mesa.id_mesa}
            </button>
            <h5>{mesa.estado_mesa}</h5>

            <Modal
              isOpen={modals[mesa.id_mesa]}
              onClose={closeModal}
              onSubmit={handleSubmit}
              mesa={mesa.id_mesa}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;

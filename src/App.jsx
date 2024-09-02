
import { useState } from "react";
import "./App.css";

import { HeaderComponent } from "./components/HeaderComponent";
import Modal from "./components/Modal";



function App() {

  const [modals, setModals] = useState(Array(6).fill(false));
  const [modalIndex, setModalIndex] = useState(null);
  const [data, setData] = useState([]);

  const openModal = (index) => {
    setModalIndex(index);
    const newModals = [...modals];
    newModals[index] = true;
    setModals(newModals);
  };

  const closeModal = () => {
    const newModals = [...modals];
    newModals[modalIndex] = false;
    setModals(newModals);
    setModalIndex(null);
  };

  const handleSubmit = (formData) => {
    setData([...data, formData]);
    console.log([...data, formData]);
  };

  return (
    <div className="App">
      <HeaderComponent/>
      <div className="container-grid">
        {modals.map((_, index) => (
          <div key={index} className="container">
            <button onClick={() => openModal(index)}>Agregar Mesa {index + 1}</button>
            <Modal
              isOpen={modals[index]}
              onClose={closeModal}
              onSubmit={handleSubmit}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

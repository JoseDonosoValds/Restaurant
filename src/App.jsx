import { useState } from "react";
import "./App.css";

function App() {
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [formData, setFormData] = useState({});

  const addToCart = (e, mesaId) => {
    e.preventDefault();
    console.log(formData[mesaId]);
    setFormData({})
  };

  const infInput = (e, mesaId) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [mesaId]: {
        ...prevFormData[mesaId],
        [name]: value,
      }
    }));
    console.log(formData)
  };

  return (
    <main className="container">
      <Mesas mesas={mesas} seleccionarMesa={seleccionarMesa} />
      {mostrarPedido && (
        <Pedido
          mesa={mesaSeleccionada}
          opciones={opciones}
          cerrarPedido={cerrarPedido}
          formData={formData}
          infInput={infInput}
          addToCart={addToCart}
        />
      )}
    </main>
  );
}

export default App;
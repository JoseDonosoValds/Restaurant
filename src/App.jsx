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
      {mesas.map((item) => (
        <div key={item} className="card">
          <h2>Mesa {item}</h2>
          <article className="art">
            <form className="formulario" onSubmit={(e) => addToCart(e, item)}>
              <label htmlFor={`mesa-${item}`}>
                Mesa:
                <input
                  id={`mesa-${item}`}
                  type="text"
                  name="mesa"
                  onChange={(e) => infInput(e, item)}
                  value={formData[item]?.mesa || ""}
                />
              </label>
              <label htmlFor={`id-${item}`}>
                ID:
                <input
                  id={`id-${item}`}
                  type="text"
                  name="id"
                  onChange={(e) => infInput(e, item)}
                  value={formData[item]?.id || ""}
                />
              </label>
              <label htmlFor={`nombre-${item}`}>
                Nombre:
                <input
                  id={`nombre-${item}`}
                  type="text"
                  name="nombre"
                  onChange={(e) => infInput(e, item)}
                  value={formData[item]?.nombre || ""}
                />
              </label>
              <label htmlFor={`comida-${item}`}>
                Comida:
                <input
                  id={`comida-${item}`}
                  type="text"
                  name="comida"
                  onChange={(e) => infInput(e, item)}
                  value={formData[item]?.comida || ""}
                />
              </label>
              <label htmlFor={`bebida-${item}`}>
                Bebida:
                <input
                  id={`bebida-${item}`}
                  type="text"
                  name="bebida"
                  onChange={(e) => infInput(e, item)}
                  value={formData[item]?.bebida || ""}
                />
              </label>
              <button type="submit">Agregar</button>
            </form>
          </article>
        </div>
      ))}
    </main>
  );
}

export default App;

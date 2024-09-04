import { useEffect, useState } from "react";
import "../styles/modal.css";
import axios from "axios";

const Modal = ({ isOpen, onClose, onSubmit, mesa }) => {
  const Pedidos = "http://localhost:4000/api/restaurant/product";
  const AddPedido = "http://localhost:4000/api/restaurant/addPedido"; // Endpoint para agregar pedido

  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    camarero_id: "",
    mesa_id: mesa || "", // Inicializa el estado del formulario con el valor de la prop mesa
    genero: "",
    comida: [],
    bebida: [],
  });

  useEffect(() => {
    const getProductos = async () => {
      try {
        const { data } = await axios.get(Pedidos);
        setProductos(data);
      } catch (er) {
        console.log("Error al cargar productos:", er);
      }
    };

    getProductos();
  }, []);

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      mesa_id: mesa || "", // Actualiza el valor de mesa_id si cambia la prop
    }));
  }, [mesa]);

  const comidaOptions = productos.filter(producto => producto.categoria_id === 601);
  const bebidaOptions = productos.filter(producto => producto.categoria_id === 600);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const newItems = [...formData[type]];
    newItems[index][name] = value;
    setFormData({
      ...formData,
      [type]: newItems,
    });
  };

  const addItem = (type) => {
    const newItem = { id: "", cantidad: 1 }; 
    setFormData({
      ...formData,
      [type]: [...formData[type], newItem],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos al endpoint para agregar el pedido
      await axios.post(AddPedido, formData);
      onSubmit(formData); // Llama a la función onSubmit pasada desde el componente padre
      onClose(); // Cierra el modal
      setFormData({
        camarero_id: "",
        mesa_id: mesa || "", 
        genero: "",
        comida: [],
        bebida: [],
      });
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            ID Camarero:
            <input
              type="text"
              name="camarero_id"
              value={formData.camarero_id}
              onChange={(e) => setFormData({ ...formData, camarero_id: e.target.value })}
            />
          </label>
          <label>
            Género:
            <select
              name="genero"
              value={formData.genero}
              onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
            >
              <option value="">Seleccione un género</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </select>
          </label>
          <label>
            Mesa:
            <span>{formData.mesa_id}</span> {/* Muestra el ID de la mesa como texto */}
          </label>

          <div>
            <label>Comida:</label>
            {formData.comida.map((item, index) => (
              <div key={index}>
                <select
                  name="id"
                  value={item.id}
                  onChange={(e) => handleChange(e, index, "comida")}
                >
                  <option value="">Seleccione comida</option>
                  {comidaOptions.map((producto) => (
                    <option key={producto.id_product} value={producto.id_product}>
                      {producto.name_product}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="cantidad"
                  value={item.cantidad}
                  onChange={(e) => handleChange(e, index, "comida")}
                  min="1"
                />
              </div>
            ))}
            <button type="button" onClick={() => addItem("comida")}>Agregar Comida</button>
          </div>

          <div>
            <label>Bebida:</label>
            {formData.bebida.map((item, index) => (
              <div key={index}>
                <select
                  name="id"
                  value={item.id}
                  onChange={(e) => handleChange(e, index, "bebida")}
                >
                  <option value="">Seleccione bebida</option>
                  {bebidaOptions.map((producto) => (
                    <option key={producto.id_product} value={producto.id_product}>
                      {producto.name_product}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="cantidad"
                  value={item.cantidad}
                  onChange={(e) => handleChange(e, index, "bebida")}
                  min="1"
                />
              </div>
            ))}
            <button type="button" onClick={() => addItem("bebida")}>Agregar Bebida</button>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

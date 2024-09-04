import React, { useEffect, useState } from "react";
import "../styles/modal.css";
import axios from "axios";

const ModalPedido = ({ isOpen, onClose, mesa, onUpdateMesa }) => {
  const endpointVerPedido = "http://localhost:4001/api/restaurant/verPedido";
  const endpointUpdatePedido = "http://localhost:4001/api/restaurant/updatePedido";
  const endpointGetProducts = "http://localhost:4001/api/restaurant/product"; // Endpoint para obtener los productos

  const [pedido, setPedido] = useState(null);
  const [totalPedido, setTotalPedido] = useState(0);
  const [productos, setProductos] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [drinkOptions, setDrinkOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedDrink, setSelectedDrink] = useState("");
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [drinkQuantity, setDrinkQuantity] = useState(1);

  useEffect(() => {
    const fetchPedido = async () => {
      if (mesa) {
        try {
          const { data } = await axios.get(endpointVerPedido, {
            params: { id_mesa: mesa },
          });
          setPedido(data.pedido);
          calcularTotalPedido(data.pedido);
        } catch (error) {
          console.error("Error al obtener el pedido:", error);
        }
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(endpointGetProducts);
        setProductos(data);
        setFoodOptions(data.filter(producto => producto.categoria_id === 601)); // Filtrar comidas
        setDrinkOptions(data.filter(producto => producto.categoria_id === 600)); // Filtrar bebidas
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchPedido();
    fetchProducts();
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

  const handleAddFood = () => {
    if (selectedFood) {
      const producto = productos.find(p => p.id_product === parseInt(selectedFood));
      if (producto) {
        const updatedPedido = { ...pedido };
        const foodItem = {
          id: selectedFood,
          cantidad: foodQuantity,
          name_product: producto.name_product,
          price: producto.price,
        };
        updatedPedido.comida.push(foodItem);
        setPedido(updatedPedido);
        calcularTotalPedido(updatedPedido);
        setSelectedFood("");
        setFoodQuantity(1);
      }
    }
  };

  const handleAddDrink = () => {
    if (selectedDrink) {
      const producto = productos.find(p => p.id_product === parseInt(selectedDrink));
      if (producto) {
        const updatedPedido = { ...pedido };
        const drinkItem = {
          id: selectedDrink,
          cantidad: drinkQuantity,
          name_product: producto.name_product,
          price: producto.price,
        };
        updatedPedido.bebida.push(drinkItem);
        setPedido(updatedPedido);
        calcularTotalPedido(updatedPedido);
        setSelectedDrink("");
        setDrinkQuantity(1);
      }
    }
  };

  const handleUpdatePedido = async () => {
    if (pedido) {
      try {
        await axios.put(endpointUpdatePedido, pedido);
        alert("Pedido actualizado con éxito");
        onUpdateMesa(); 
      } catch (error) {
        console.error("Error al actualizar el pedido:", error);
      }
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
            <h4>Agregar Comida:</h4>
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="">Selecciona una comida</option>
              {foodOptions.map((food) => (
                <option key={food.id_product} value={food.id_product}>
                  {food.name_product} - ${food.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={foodQuantity}
              onChange={(e) => setFoodQuantity(parseInt(e.target.value, 10))}
              min="1"
              placeholder="Cantidad"
            />
            <button onClick={handleAddFood}>Agregar Comida</button>
            <h4>Agregar Bebida:</h4>
            <select
              value={selectedDrink}
              onChange={(e) => setSelectedDrink(e.target.value)}
            >
              <option value="">Selecciona una bebida</option>
              {drinkOptions.map((drink) => (
                <option key={drink.id_product} value={drink.id_product}>
                  {drink.name_product} - ${drink.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={drinkQuantity}
              onChange={(e) => setDrinkQuantity(parseInt(e.target.value, 10))}
              min="1"
              placeholder="Cantidad"
            />
            <button onClick={handleAddDrink}>Agregar Bebida</button>
            <button onClick={handleUpdatePedido}>Actualizar Pedido</button>
          </>
        ) : (
          <p>No hay pedido para esta mesa.</p>
        )}
      </div>
    </div>
  );
};

export default ModalPedido;

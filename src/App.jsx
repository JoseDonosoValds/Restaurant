
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { HeaderComponent } from "./components/HeaderComponent";
import Modal from "./components/Modal";
import { Footer } from "./components/Footer";



function App() {
  const Enpoint_mesa="http://localhost:4000/api/restaurant/mesa"
  const [modals, setModals] = useState(Array(6).fill(false));
  const [modalIndex, setModalIndex] = useState(null);
  const [data, setData] = useState([]);
  const[dataMesa,setDatamesa]=useState(null)

   useEffect(()=>{
      const getMesa=async()=>{
        try{
      const mesa = await axios.get(Enpoint_mesa)
      setDatamesa(mesa.data)
      console.log(mesa.data)
  
     }catch(er){
      console.log(error,er)
     }
    }
     
    getMesa()
    },[])
   
 

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
        {dataMesa?.map(( index) => (
          <div key={index.id} className="container">
            <h1>{index.name_mesa}</h1>
            <div className="contenedorImagen">
              <img src="../public/mesa2.png" alt="imagen de mesa con copas" />
            </div>
            <button onClick={() => openModal(index)}>Tomar pedido {index.id_mesa}</button>
                        <h5>{index.estado_mesa}</h5>

            <Modal
              isOpen={modals[index]}
              onClose={closeModal}
              onSubmit={handleSubmit}
              mesa={index.id_mesa}
            />
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default App;

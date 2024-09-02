import { useState } from 'react';
import '../styles/modal.css';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    mesa: '',
    comida: '',
    bebida: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({})
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <label>
            ID:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </label>
          <label>
            Mesa:
            <input
              type="text"
              name="mesa"
              value={formData.mesa}
              onChange={handleChange}
            />
          </label>
          <label>
            Comida:
            <input
              type="text"
              name="comida"
              value={formData.comida}
              onChange={handleChange}
            />
          </label>
          <label>
            Bebida:
            <input
              type="text"
              name="bebida"
              value={formData.bebida}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};



export default Modal
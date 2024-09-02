import React from "react";
import "../styles/header.css";

export const HeaderComponent = () => {
  return (
    <div className="header">
      <div className="contenedorNav">
        <h1>Restaurant Don Pepe</h1>
        <nav>
          <ul>
            <li>Nosotros</li>
            <li>Menú</li>
            <li>Regístrate</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

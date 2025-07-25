import React from "react";

function Stock({ stock, onClick }) {
  return (
    <div onClick={() => onClick(stock)} style={{ cursor: "pointer" }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{stock.name}</h5>
          <p className="card-text">${stock.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Stock;

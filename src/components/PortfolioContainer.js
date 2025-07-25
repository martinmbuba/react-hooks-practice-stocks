import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolioStocks, onStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStocks.map((stock) => (
        <Stock key={stock.id} stock={stock} onClick={onStockClick} />
      ))}
    </div>
  );
}

export default PortfolioContainer;

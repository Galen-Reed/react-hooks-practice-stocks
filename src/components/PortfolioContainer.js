import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocks.map((stock) => (
        <Stock key={stock.id} stock={stock} onStockClick={onStockClick}/>
        ))}
    </div>
  );
}

export default PortfolioContainer;

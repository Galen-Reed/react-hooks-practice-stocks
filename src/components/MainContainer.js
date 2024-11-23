import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, [])

  function handleBuyStock(stock) {
    if (!portfolio.find((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  }

  function handleFilter(type) {
    setFilterType(type);
  }

  const filteredStocks = stocks.filter((stock) =>
    filterType ? stock.type === filterType : true
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div>
      <SearchBar onFilter={handleFilter} sortBy={sortBy} setSortBy={setSortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedStocks} onStockClick={handleBuyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onStockClick={handleSellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

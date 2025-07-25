import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  function handleBuyStock(stock) {
    if (!portfolioStocks.find((s) => s.id === stock.id)) {
      setPortfolioStocks([...portfolioStocks, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolioStocks(portfolioStocks.filter((s) => s.id !== stock.id));
  }

  function handleSortChange(sortValue) {
    setSortBy(sortValue);
  }

  function handleFilterChange(filterValue) {
    setFilterBy(filterValue);
  }

  function getFilteredAndSortedStocks() {
    let filteredStocks = stocks;
    if (filterBy !== "All") {
      filteredStocks = stocks.filter((stock) => stock.type === filterBy);
    }

    if (sortBy === "Alphabetically") {
      filteredStocks = [...filteredStocks].sort((a, b) =>
        a.ticker.localeCompare(b.ticker)
      );
    } else if (sortBy === "Price") {
      filteredStocks = [...filteredStocks].sort((a, b) => a.price - b.price);
    }

    return filteredStocks;
  }

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        filterBy={filterBy}
        onFilterChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={getFilteredAndSortedStocks()}
            onStockClick={handleBuyStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolioStocks={portfolioStocks}
            onStockClick={handleSellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

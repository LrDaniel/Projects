import React from "react";
import "../styles/Sorter.css";

function Sorter({ filterCoins, setFilterCoins }) {
  const sorting = (value) => {
    let sorted = [];
    switch (value) {
      case "caphigh":
        sorted = [...filterCoins].sort((a, b) => {
          return b.market_cap - a.market_cap;
        });
        break;
      case "caplow":
        sorted = [...filterCoins].sort((a, b) => {
          return a.market_cap - b.market_cap;
        });
        break;
      case "pricehigh":
        sorted = [...filterCoins].sort((a, b) => {
          return b.current_price - a.current_price;
        });
        break;
      case "pricelow":
        sorted = [...filterCoins].sort((a, b) => {
          return a.current_price - b.current_price;
        });
        break;
      case "gain":
        sorted = [...filterCoins].sort((a, b) => {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        });
        break;
      case "loss":
        sorted = [...filterCoins].sort((a, b) => {
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        });
        break;
      default:
        return [...filterCoins];
    }
    setFilterCoins(sorted);
  };

  return (
    <>
      <div className="Sorter">
        <label htmlFor="options">Sort by:</label>
        <select
          name="coins"
          id="coins"
          onChange={(e) => sorting(e.target.value)}
        >
          <option value="caphigh">Market Cap(highest)</option>
          <option value="caplow">Market Cap(lowest)</option>
          <option value="pricehigh">Price(highest)</option>
          <option value="pricelow">Price(lowest)</option>
          <option value="gain">Most gain in 24hr</option>
          <option value="loss">Most loss in 24hr</option>
        </select>
      </div>
    </>
  );
}
export default Sorter;

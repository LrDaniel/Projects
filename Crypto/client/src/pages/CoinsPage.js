import React, { useState, useEffect } from "react";
import "../styles/CoinsPage.css";
import Coin from "../components/Coin";
import Sorter from "../components/Sorter";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import RefreshIcon from "@mui/icons-material/Refresh";

function CoinsPage() {
  const [coins, setCoins] = useState([]);
  const [filterCoins, setFilterCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [order, setOrder] = useState("");
  const [refresh, setRefresh] = useState(false);

  const fetchCoins = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoins(res.data);
      setFilterCoins(res.data);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCoins();
  }, [refresh]);

  const handleChange = (e) => {
    const filltered = coins.filter((coin) => {
      return coin.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterCoins(filltered);
  };

  const styleSpin = {
    color: "blue",
    position: "absolute",
    top: "45%",
    left: "47%",
  };

  return (
    <div className="container">
      <div className="searchUpdate">
        <input
          className="filter"
          type="text"
          onChange={handleChange}
          placeholder="Type to search..."
        />

        <RefreshIcon onClick={() => setRefresh(!refresh)} />
      </div>
      <Sorter
        filterCoins={filterCoins}
        setFilterCoins={setFilterCoins}
        order={order}
        setOrder={setOrder}
      />

      {isLoading ? (
        <ClipLoader
          color="white"
          loading={isLoading}
          size={150}
          css={styleSpin}
        />
      ) : (
        filterCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              id={coin.id}
              icon={coin.image}
              coinName={coin.name}
              coinSymbol={coin.symbol}
              price={coin.current_price}
              marketCap={coin.market_cap}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })
      )}
    </div>
  );
}

export default CoinsPage;

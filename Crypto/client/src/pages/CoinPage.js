import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "../styles/CoinPage.css";

function CoinPage() {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCoin = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log(coinData);
  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="coinCard">
            <img
              src={coinData.image.large}
              onClick={() => navigate("/coins")}
              alt={`${id} icon`}
            />

            <p className="coinName">Name: {coinData.name}</p>
            <p className="symbol">Symbol: {coinData.symbol}</p>
            <p className="currPrice">
              Current Price: {coinData.market_data.current_price.usd}$
            </p>
            <p className="cap">
              Market Cap: {coinData.market_data.market_cap.usd.toLocaleString()}
              $
            </p>
            <p className="vol">
              Total Volume:{" "}
              {coinData.market_data.total_volume.usd.toLocaleString()}$
            </p>
            <p className="high">
              24hr High: {coinData.market_data.high_24h.usd.toLocaleString()}$
            </p>
            <p className="low">
              24hr Low: {coinData.market_data.low_24h.usd.toLocaleString()}$
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default CoinPage;

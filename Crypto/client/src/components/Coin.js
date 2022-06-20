import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Coin.css";

function Coin({
  icon,
  coinName,
  coinSymbol,
  price,
  marketCap,
  priceChange,
  id,
}) {
  const navigate = useNavigate();

  return (
    <div>
      {priceChange ? (
        <>
          {" "}
          <div className="coins_wrap">
            <div className="coin" onClick={() => navigate("/coins/" + id)}>
              <div className="coinimg">
                <img src={icon} className="image" />
              </div>
              <div className="name">{coinName}</div>
              <div className="symbol">{coinSymbol.toUpperCase()}</div>
              <div className="price">${price.toFixed(2)} per coin</div>
              {priceChange < 0 ? (
                <div className="price-change red">
                  {priceChange.toFixed(3)}%
                </div>
              ) : (
                <div className="price-change green">
                  {priceChange.toFixed(2)}%
                </div>
              )}
              <div className="cap">{marketCap.toLocaleString()}</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Coin;

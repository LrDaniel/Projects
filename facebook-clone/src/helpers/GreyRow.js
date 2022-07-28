import React from "react";
import "./GreyRow.css";

function GreyRow({ title, icon1, icon2, selected }) {
  return (
    <div className={selected ? selected : "modal-btns"}>
      <div className="icon1">{icon1}</div>

      <span>{title}</span>
      <div className="icon2">{icon2}</div>
    </div>
  );
}

export default GreyRow;

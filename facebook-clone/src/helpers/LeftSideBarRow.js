import React from "react";
import "./LeftSideBarRow.css";
function LeftSideBarRow({ icon, title, svg }) {
  return (
    <div className="LeftSideBarRow">
      {icon ? <img src={icon} alt={title} /> : svg}
      <span>{title}</span>
    </div>
  );
}

export default LeftSideBarRow;

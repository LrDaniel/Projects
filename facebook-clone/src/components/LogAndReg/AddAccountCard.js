import React from "react";
import "../../styles/AddAccountCard.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function AddAccountCard() {
  return (
    <div className="AddAccountCard">
      <div className="top-card">
        <AddCircleIcon />
      </div>
      <div className="bottom-card">Add Account</div>
    </div>
  );
}

export default AddAccountCard;

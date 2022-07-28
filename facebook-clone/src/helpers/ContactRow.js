import React from "react";
import "./ContactRow.css";
import { useNavigate } from "react-router-dom";

function ContactRow({ img, name, uid }) {
  const navigate = useNavigate();
  console.log(uid);
  return (
    <div className="user-content" onClick={() => navigate(`/profile/${uid}`)}>
      <img src={img} />
      <a href="#">{name}</a>
    </div>
  );
}

export default ContactRow;

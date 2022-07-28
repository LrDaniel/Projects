import React from "react";
import "../styles/CreateRoom.css";
import CamIcon from "@material-ui/icons/Videocam";

function CreateRoom({ users }) {
  return (
    <div className="room-container">
      <div className="create-btn">
        <CamIcon />
        <p>CreateRoom</p>
      </div>
      <div>
        {users.map((users) => {
          return <img src={users.photoURL}></img>;
        })}
      </div>
    </div>
  );
}

export default CreateRoom;

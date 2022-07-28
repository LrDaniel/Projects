import React from "react";
import "./CreateStoryCard.css";
import CircleIcon from "@material-ui/icons/AddCircle";

function CreateStoryCard({ user }) {
  return (
    <div className="c-story-card">
      <div className="upper-c-story-card">
        <img src={user?.photoURL}></img>
      </div>
      <CircleIcon />
      <div className="bottom-c-story-card">
        <p>create story</p>
      </div>
    </div>
  );
}

export default CreateStoryCard;

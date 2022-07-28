import React from "react";
import "./StoryCard.css";

function StoryCard({ name, pic, profilePic }) {
  return (
    <div className="story-card">
      <div className="story-user-img">
        <img src={profilePic} />
      </div>
      <div className="story-user-preview">
        <img src={pic} />
      </div>
      <div className="story-user-name">
        <p>{name}</p>
      </div>
    </div>
  );
}

export default StoryCard;

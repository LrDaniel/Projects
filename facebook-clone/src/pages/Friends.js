import React from "react";
import LeftSideFriends from "../components/FriendsPage/LeftSideFriends";
import "../styles/Friends.css";
function Friends() {
  return (
    <>
      <div className="friends-container">
        <div>
          <LeftSideFriends />
        </div>
      </div>
    </>
  );
}

export default Friends;

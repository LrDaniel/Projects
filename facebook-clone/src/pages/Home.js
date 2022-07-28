import React from "react";
import "../styles/Home.css";
import HomeLeftSideBar from "../components/MainPage/HomeLeftSideBar";
import HomeRightSideBar from "../components/MainPage/HomeRightSideBar";
import HomeFeeds from "../components/MainPage/HomeFeeds";

function Home() {
  return (
    <>
      <div className="home-container">
        <div className="left-side">
          <HomeLeftSideBar />
        </div>
        <div className="middle-side">
          <HomeFeeds />
        </div>

        <div className="right-side">
          <HomeRightSideBar />
        </div>
      </div>
    </>
  );
}

export default Home;

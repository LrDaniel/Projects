import React from "react";
import "../styles/Home.css";
import videoBg from "../assets/bg.mp4";

function Home() {
  return (
    <div className="main">
      <div className="overlay"></div>
      <div className="content ">
        <h2>Welcome to the </h2>
        <h1>Future</h1>
      </div>

      <video src={videoBg} autoPlay loop muted />
    </div>
  );
}

export default Home;

import Map from "./Pages/Map";
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Info from "./Pages/Info";

function App() {
  const [toggle, setToggle] = useState(false);
  const [center, setCenter] = useState({
    lat: 59.955413,
    lng: 30.337844,
  });
  const [zoom, setZoom] = useState(0);
  const [count, setCount] = useState(0);

  let intervalID = useRef();

  const fetchSpaceStation = async () => {
    const res = await axios.get("https://api.open-notify.org/iss-now.json");
    const { longitude, latitude } = await res.data.iss_position;
    setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  };

  useEffect(() => {
    const inter = async () => {
      intervalID = setInterval(() => {
        fetchSpaceStation();
      }, 1200);
    };
    inter();
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/info"
          element={<Info toggle={toggle} setToggle={setToggle} />}
        />
        <Route
          path="/"
          element={
            <Map
              center={center}
              zoom={zoom}
              toggle={toggle}
              setToggle={setToggle}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

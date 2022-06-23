import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "../Styles/Map.css";
import issIcon from "../assets/ssi.png";
import { useNavigate } from "react-router-dom";
import mapStyle from "../Styles/mapStyle.js";
import Toggle from "../util/Toggle";

function Map({ center, zoom, toggle, setToggle }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goToInfo = () => {
    navigate("/info");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
      {loading ? (
        <h1>Loading ISS position...</h1>
      ) : (
        <>
          <Toggle toggle={toggle} setToggle={setToggle} />
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
              defaultCenter={center}
              options={{ styles: toggle ? mapStyle.darkMode : null }}
              defaultZoom={zoom}
            >
              <img
                src={issIcon}
                alt="SSI"
                className="iss-icon"
                lat={center.lat}
                lng={center.lng}
                onClick={goToInfo}
              />
            </GoogleMapReact>
          </div>
        </>
      )}
    </>
  );
}

export default Map;

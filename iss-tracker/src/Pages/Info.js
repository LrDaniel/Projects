import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Info.css";
import issIcon from "../assets/ssi.png";
import { useNavigate } from "react-router-dom";
import Toggle from "../util/Toggle";

function Info({ toggle, setToggle }) {
  const [data, setData] = useState({});
  const [issData, setIssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAstroInfo = async () => {
    const res = await axios.get("http://api.open-notify.org/astros.json");
    setData(res.data);

    const filter = () => {
      const filtered = res.data.people.filter(
        (person) => person.craft === "ISS"
      );
      console.log(filtered);
      setIssData(filtered);
      setLoading(false);
    };
    filter();
  };

  useEffect(() => {
    getAstroInfo();
  }, []);

  const goToMap = () => {
    navigate("/");
  };

  return (
    <div className={toggle ? "containerDark" : "containerLight"}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <Toggle toggle={toggle} setToggle={setToggle} />

          <img
            src={issIcon}
            alt="SSI"
            className="backbtn"
            onClick={() => goToMap()}
          />
          <div className="desc">
            <h2>So what is the ISS?</h2>
            <p>
              The International Space Station (ISS) is a modular space station
              (habitable artificial satellite) in low Earth orbit.
            </p>
            <p>
              It is a multinational collaborative project involving five
              participating space agencies: NASA (United States), Roscosmos
              (Russia), JAXA (Japan), ESA (Europe), and CSA (Canada).
            </p>
            <p>
              The ownership and use of the space station is established by
              intergovernmental treaties and agreements.
            </p>

            <p>
              The station serves as a microgravity and space environment
              research laboratory in which scientific research is conducted in
              astrobiology, astronomy, meteorology, physics, and other fields.
            </p>

            <p>
              The ISS is suited for testing the spacecraft systems and equipment
              required for possible future long-duration missions to the Moon
              and Mars.
            </p>
            <p>
              The ISS travels at about 17,500 miles/28,000 kilometers per hour.
              At this speed, the ISS orbits the Earth every 90 minutes, which
              gives the crew 16 sunrises and sunsets every day.
            </p>
          </div>

          <h2> Currently on the ISS there are {data.number} astronauts:</h2>

          {issData.map((person, key) => {
            return (
              <div className={toggle ? "nameDark" : "nameLight"} key={key}>
                <p> {person.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Info;

import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import { createContext, useContext } from "react";
import * as L from "leaflet";
import "./Map.css";
import Modal from "../Modal/Modal";
import { AppContext } from "../../App";

export const ModalContext = createContext();

const Map = (props) => {
  const center = [50.832915, -3.146892];
  const zoom = 2;
  const { currentCountryData, setCurrentCountryData, modal, setModal } =
    useContext(AppContext);

  const countryStyle = {
    fillColor: "#002434",
    color: "#12B6FF",
    weight: 0.5,
    fillOpacity: 1,
  };

  const OnEachCountry = (country, layer) => {
    const map = useMap();
    const name = country.properties.ADMIN;
    const population = country.properties.POPULATION;
    const deaths = country.properties.DEATHS;
    const cases = country.properties.CASES;
    const active = country.properties.ACTIVE;
    const recovered = country.properties.RECOVERED;
    const lastUpdate = country.properties.LAST_UPDATE;
    const flag = country.properties.FLAG;

    function openModal(f) {
      return function (e) {
        e.srcElement.onclick = setModal(true);
        map.closePopup();
      };
    }

    var popupCountryInfo = L.popup({
      closeOnClick: true,
      autoClose: true,
      offset: [0, 14],
    }).setContent(
      `
    <div class="pop" >
    Country:  ${name} <img src=${flag} placeholder="${name}"/>
    <br/>
    Population:${population}
    <br/>
    Cases:${cases}
    <br/>
    Infected:${active}
    <br/>
    Recovered:${recovered}
    <br/>
    Deaths:${deaths}
    <br/>
    Last Update:${lastUpdate}
    <br/>
    <button id='moreInfo'  >More info</button>
    

    </div>`
    );

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({
          fillColor: "#00405C",
          color: "white",
        });
        L.popup({
          closeOnClick: true,
          autoClose: true,
        })
          .setLatLng(event.latlng)
          .setContent(
            `<div class="hoverpop">
            ${name} <img src=${flag} placeholder="${name}"/>
            <br/>
            Click country for info
            </div>`
          )
          .openOn(map);
        layer.bindPopup(popupCountryInfo);
      },
      mouseout: (event) => {
        event.target.setStyle({
          fillColor: "#002434",
          color: "#12B6FF",
        });
      },
      popupopen: (layer) => {
        L.DomEvent.on(
          document.getElementById("moreInfo"),
          "click",
          openModal(layer)
        );
      },
      click: (event) => {
        var popupCountryInfo = event.target.getPopup();
        popupCountryInfo.setLatLng(event.latlng).openOn(map);
        layer.bindPopup(popupCountryInfo).openPopup().closePopup();
        setCurrentCountryData(country.properties);
      },
    });
  };

  return (
    <>
      <div>
        {modal ? (
          <div id="modal_overlay">
            <ModalContext.Provider value={{ setModal, currentCountryData }}>
              <Modal />
            </ModalContext.Provider>
          </div>
        ) : null}
      </div>
      <div id="map">
        <MapContainer
          style={{ height: "100vh" }}
          zoom={zoom}
          center={center}
          minZoom={2.3}
          maxZoom={6}
          scrollWheelZoom="true"
        >
          <GeoJSON
            style={countryStyle}
            data={props.countriesData}
            onEachFeature={OnEachCountry}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

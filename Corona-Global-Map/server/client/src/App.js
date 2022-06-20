import Map from "./components/Map/Map";
import { countries } from "./countries.js";
import { useState, useEffect, createContext } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Button from "./components/Button/Button";
import FavoritesModal from "./components/FavoritesModal/FavoritesModal";
import "./loader.css";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [countriesJson, setCountriesJson] = useState(JSON.parse(countries));
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState("");
  const [favoritesModal, setFavoritesModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [currentCountryData, setCurrentCountryData] = useState([]);
  const [modal, setModal] = useState(false);
  const [countriesInFavorite, setCountriesInFavorite] = useState([]);
  const [isInFav, setIsInFav] = useState(false);

  useEffect(() => {
    const getData = async (countries) => {
      const features = countriesJson.features;
      for (var i = features.length - 1; i >= 0; i--) {
        const iso_a3 = features[i].properties.ISO_A3;
        const iso3 = countries.find((item) => item.countryInfo.iso3 === iso_a3);
        if (iso3) {
          features[i].properties.POPULATION = iso3.population.toLocaleString();
          features[i].properties.CASES = iso3.cases.toLocaleString();
          features[i].properties.ACTIVE = iso3.active.toLocaleString();
          features[i].properties.RECOVERED = iso3.recovered.toLocaleString();
          features[i].properties.DEATHS = iso3.deaths.toLocaleString();
          features[i].properties.LAST_UPDATE = new Date(iso3.updated);
          features[i].properties.FLAG = new URL(iso3.countryInfo.flag).toJSON();
          features[i].properties.CRITICAL = iso3.critical.toLocaleString();
          features[i].properties.TESTS = iso3.tests.toLocaleString();
          features[i].properties.TODAY_CASES = iso3.todayCases.toLocaleString();
          features[i].properties.CONTINENT = iso3.continent.toLocaleString();
          features[i].properties.CASES_PER_MILLION =
            iso3.casesPerOneMillion.toLocaleString();
          features[i].properties.TESTS_PER_MILLION =
            iso3.testsPerOneMillion.toLocaleString();
          features[i].properties.DEATHS_PER_MILLION =
            iso3.deathsPerOneMillion.toLocaleString();
          features[i].properties.CRITICAL_PER_MILLION =
            iso3.criticalPerOneMillion.toLocaleString();
          features[i].properties.ACTIVE_PER_MILLION =
            iso3.activePerOneMillion.toLocaleString();
          features[i].properties.RECOVERED_PER_MILLION =
            iso3.recoveredPerOneMillion.toLocaleString();

          features[i].properties.TODAY_RECOVERED =
            iso3.todayRecovered.toLocaleString();

          features[i].properties.TODAY_DEATHS =
            iso3.todayDeaths.toLocaleString();
        }
      }
      await setCountriesJson({ ...countriesJson });
      setLoading(false);
    };
    const setData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          getData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setData();
  }, []);

  return (
    <>
      <div>
        {loading === true ? (
          <div className="loader">
            <PulseLoader
              size={"50px"}
              color={"#000811"}
              margin={"10px"}
              loading={loading}
            />
          </div>
        ) : (
          <div>
            <AppContext.Provider
              value={{
                currentId,
                setCurrentId,
                favoritesModal,
                setFavoritesModal,
                selectedCountry,
                setSelectedCountry,
                countriesJson,
                currentCountryData,
                setCurrentCountryData,
                modal,
                setModal,
                countriesInFavorite,
                setCountriesInFavorite,
                isInFav,
                setIsInFav,
              }}
            >
              <Button />
              <Map countriesData={countriesJson} />
            </AppContext.Provider>
          </div>
        )}
        {favoritesModal ? (
          <>
            <AppContext.Provider
              value={{
                setFavoritesModal,
                currentId,
                countriesJson,
                selectedCountry,
                setSelectedCountry,
                setCurrentCountryData,
                setModal,
                modal,
                countriesInFavorite,
                setCountriesInFavorite,
              }}
            >
              <FavoritesModal />
            </AppContext.Provider>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;

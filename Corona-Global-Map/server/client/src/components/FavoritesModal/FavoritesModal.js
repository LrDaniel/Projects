import "./FavoritesModal.css";
import { AppContext } from "../../App";
import { useEffect, useContext } from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

import Axios from "axios";

const FavoritesModal = () => {
  const {
    setFavoritesModal,
    currentId,
    countriesJson,
    selectedCountry,
    setSelectedCountry,
    setCurrentCountryData,
    setModal,
    setCountriesInFavorite,
  } = useContext(AppContext);

  useEffect(() => {
    const getFavCountry = async () => {
      let arr = [];
      const mashu = await Axios.get(`/favorites/${currentId}`);
      const mashudata = await mashu.data;
      for (let index = 0; index < mashudata.length; index++) {
        const fillteredCountry = countriesJson.features.find((item) => {
          return item.properties.ADMIN === mashudata[index].country;
        });
        arr.push(fillteredCountry);
      }
      await setSelectedCountry([...arr]);
      setFavoritesModal(true);
      setCountriesInFavorite(mashudata);
    };
    getFavCountry();
  }, []);

  const openFav = (country) => {
    console.log(country);
    setCurrentCountryData(country);
    setModal(true);
    setFavoritesModal(false);
  };

  const clearAll = async () => {
    try {
      await Axios.post("/delall", {
        user_id: currentId,
      });
      await setSelectedCountry([]);
    } catch (error) {
      console.log(error);
    }
  };

  const singleDel = async (country) => {
    try {
      await Axios.post("/singledel", {
        country: country,
      }).then((data) => {
        console.log(data.data[0].country);
        const find = selectedCountry.findIndex(
          (country) => country.properties.ADMIN === data.data[0].country
        );
        selectedCountry.splice(find, 1);
        setSelectedCountry([...selectedCountry]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedCountry);

  return (
    <div className="overlay_fav">
      <div id="modal_fav">
        <div className="UpperModal">
          <h1>Favorites:</h1>
          <button className="clear_all" onClick={() => clearAll()}>
            Clear all
          </button>
          <AiOutlineClose
            className="exit_fav"
            onClick={() => setFavoritesModal(false)}
          />
        </div>
        <div className="rest_fav">
          {selectedCountry.map((item, i) => {
            console.log(item.properties);
            return (
              <>
                <div
                  className="countryCard tooltipfav"
                  clas
                  onClick={() => openFav(item.properties)}
                  style={{
                    backgroundImage: `url(${item.properties.FLAG})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="countryName  " key={i}>
                    <div>
                      <span className="tooltiptextfav">
                        {item.properties.ADMIN}
                      </span>
                      {/* <img src={item.properties.FLAG} placeholder="${name}" /> */}
                    </div>
                    <AiFillDelete
                      className="single_del"
                      onClick={(e) => {
                        e.stopPropagation();
                        singleDel(item.properties.ADMIN);
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;

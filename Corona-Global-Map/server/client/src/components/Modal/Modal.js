import "./Modal.css";
import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../Map/Map";
import { AppContext } from "../../App";
import Axios from "axios";
import { VscCircleFilled, VscWarning } from "react-icons/vsc";

const Modal = () => {
  const [loginMsg, setLoginMsg] = useState("");
  const { setModal, currentCountryData } = useContext(ModalContext);
  const { currentId, isInFav, setIsInFav, setFavoritesModal } =
    useContext(AppContext);

  const favoriteDeleteAndAdd = async (value) => {
    if (value) {
      try {
        const delfav = await Axios.post("/delfav", {
          country: currentCountryData.ADMIN,
          user_id: currentId,
        });
        console.log("del", delfav.data);
        const delfavData = await delfav.data;
        if (delfavData.length > 0) {
          await setIsInFav(false);
          setModal(false);
          setFavoritesModal(true);
        } else {
          await setIsInFav(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const add = await Axios.post("/favorites", {
          country: currentCountryData.ADMIN,
          user_id: currentId,
        });
        console.log("add", add.data);
        const addData = await add.data;
        if (addData.msg === 102) {
          setLoginMsg("Need to be logged in order to save");
          await setIsInFav(false);
        } else {
          await setIsInFav(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      try {
        const fetchOnLoad = await Axios.post("/isfav", {
          country: currentCountryData.ADMIN,
          user_id: currentId,
        });
        const data = fetchOnLoad.data;
        if (data.length > 0) {
          setIsInFav(true);
        } else {
          setIsInFav(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    onLoad();
  }, []);
  console.log(currentCountryData);

  return (
    <>
      <div id="modal">
        <button className="exit_modal" onClick={() => setModal(false)}>
          X
        </button>

        <div className="overall_data">
          <h2>{currentCountryData.ADMIN}'s current state:</h2>
          <p>
            <VscCircleFilled style={{ color: "#ccc" }} />
            Continent : {currentCountryData.CONTINENT}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#ccc" }} />
            Population : {currentCountryData.POPULATION}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#C5FF85" }} />
            Tests : {currentCountryData.TESTS}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#4149C3" }} />
            Cases : {currentCountryData.CASES}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#2CD23E" }} />
            Recovered : {currentCountryData.RECOVERED}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#E9C33C" }} />
            Critical : {currentCountryData.CRITICAL}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#E53629" }} />
            Deaths : {currentCountryData.DEATHS}
          </p>
        </div>
        <div className="perMillion">
          <h3>Data per million:</h3>
          <p>
            <VscCircleFilled style={{ color: "#C5FF85" }} />
            Tests : {currentCountryData.TESTS_PER_MILLION}
          </p>

          <p>
            <VscCircleFilled style={{ color: "#4149C3" }} />
            Cases : {currentCountryData.CASES_PER_MILLION}
          </p>

          <p>
            <VscCircleFilled style={{ color: "#2CD23E" }} />
            Recovered : {currentCountryData.RECOVERED_PER_MILLION}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#E9C33C" }} />
            Critical : {currentCountryData.CRITICAL_PER_MILLION}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#E53629" }} />
            Deaths : {currentCountryData.DEATHS_PER_MILLION}
          </p>
        </div>

        <div className="todays_data">
          <h3>Todays news:</h3>
          <p>
            <VscCircleFilled style={{ color: "#4149C3" }} />
            Cases : {currentCountryData.TODAY_CASES}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#2CD23E" }} />
            Recovered : {currentCountryData.TODAY_RECOVERED}
          </p>
          <p>
            <VscCircleFilled style={{ color: "#E53629" }} />
            Deaths : {currentCountryData.TODAY_DEATHS}
          </p>
        </div>

        <button
          className="fav_btn"
          onClick={() => favoriteDeleteAndAdd(isInFav)}
        >
          {isInFav ? "Remove from favorite" : "Add to favorites"}
        </button>
        {loginMsg.length > 0 ? (
          <p className="login_msg">
            <VscWarning style={{ margin: "0px 3px 3px 0px" }} />
            {loginMsg}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default Modal;

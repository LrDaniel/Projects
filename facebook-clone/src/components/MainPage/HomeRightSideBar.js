import React, { useContext, useState, useEffect } from "react";
import ContactRow from "../../helpers/ContactRow";
import { AppContext } from "../../App";
import "../../styles/HomeRightSideBar.css";
import CameraIcon from "@material-ui/icons/MeetingRoom";
import SearchIcon from "@material-ui/icons/Search";
import DotsIcon from "@material-ui/icons/MoreHoriz";

function HomeRightSideBar() {
  const { user, users } = useContext(AppContext);
  const [excludeCurr, setExcludeCurr] = useState([]);

  useEffect(() => {
    const f = users?.filter(
      (eachuser) => eachuser.displayName !== user.displayName
    );
    setExcludeCurr(f);
  }, [users]);

  return (
    <div className="RightSideBarRow">
      <div>
        <div className="contact-row">
          <p>Contacts</p>
          <div>
            <CameraIcon />
            <SearchIcon />

            <DotsIcon />
          </div>
        </div>
        {excludeCurr?.map((eachuser) => {
          return (
            <ContactRow
              img={eachuser?.photoURL}
              name={eachuser?.displayName}
              uid={eachuser?.uid}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomeRightSideBar;

import React from "react";
import GreyRow from "../../helpers/GreyRow";
import LeftArrowIcon from "@material-ui/icons/ArrowForwardIos";
import PeopleAltSharp from "@material-ui/icons/PeopleAltSharp";
import SettingsSharp from "@material-ui/icons/SettingsSharp";
import { useLocation, Link, useNavigate } from "react-router-dom";
import TitleCog from "../../helpers/TitleCog";

import "../../styles/LeftSideFriends.css";

function LeftSideFriends() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="left-friends-container">
      <TitleCog title="Friends" />

      <div>
        <div onClick={() => navigate("/friends")}>
          <GreyRow
            title="Home"
            icon1={<PeopleAltSharp />}
            selected={pathname === "/friends" ? "selectedRow" : null}
          />
        </div>
        <GreyRow
          title="Friend Requests"
          icon1={<PeopleAltSharp />}
          icon2={<LeftArrowIcon />}
        />
        <GreyRow
          title="Suggestions"
          icon1={<PeopleAltSharp />}
          icon2={<LeftArrowIcon />}
        />
        <GreyRow
          title="All friends"
          icon1={<PeopleAltSharp />}
          icon2={<LeftArrowIcon />}
        />
        <div onClick={() => navigate("/friends/birthdays")}>
          <GreyRow
            title="Birthdays"
            icon1={<PeopleAltSharp />}
            selected={pathname === "/friends/birthdays" ? "selectedRow" : null}
          />
        </div>
        <GreyRow
          title="Custom List"
          icon1={<PeopleAltSharp />}
          icon2={<LeftArrowIcon />}
        />
      </div>
    </div>
  );
}

export default LeftSideFriends;

import React, { useEffect, useState } from "react";
import TitleCog from "../../helpers/TitleCog";
import GreyRow from "../../helpers/GreyRow";
import "../../styles/LeftSideWatch.css";
import OndemandVideo from "@material-ui/icons/OndemandVideo";
import VideoCall from "@material-ui/icons/VideoCall";
import Movie from "@material-ui/icons/Movie";
import Bookmark from "@material-ui/icons/Bookmark";
import Search from "@material-ui/icons/Search";
import { useLocation, useNavigate } from "react-router-dom";

function LeftSideWatch() {
  const [color, setColor] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="left-side-watch">
      <TitleCog title="Watch" />
      <div className="search-movies">
        <Search />
        <input type="text" placeholder="Search videos" />
      </div>
      <div
        onClick={() => navigate("/watch")}
        // className={pathname === "/watch" ? "blue" : null}
      >
        <GreyRow
          title="Home"
          icon1={<OndemandVideo />}
          selected={pathname === "/watch" ? "selectedRow" : null}
        />
      </div>
      <div onClick={() => navigate("/watch/live")}>
        <GreyRow
          title="Live"
          icon1={<VideoCall />}
          selected={pathname === "/watch/live" ? "selectedRowRed" : null}
        />
      </div>
      <div
        onClick={() => navigate("/watch/shows")}
        className={pathname === "/watch/shows" ? "selectedRowGreen" : null}
      >
        <GreyRow title="Shows" icon1={<Movie />} />
      </div>

      <div
        onClick={() => navigate("/watch/saved")}
        className={pathname === "/watch/saved" ? "selectedRowOrange" : null}
      >
        <GreyRow title="Saved Videos" icon1={<Bookmark />} />
      </div>
    </div>
  );
}

export default LeftSideWatch;

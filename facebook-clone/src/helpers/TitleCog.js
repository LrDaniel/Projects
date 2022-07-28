import React from "react";
import SettingsSharp from "@material-ui/icons/SettingsSharp";
import "../helpers/TitleCog.css";

function TitleCog({ title }) {
  return (
    <div className="top-leftside">
      <h2>{title}</h2>
      <SettingsSharp />
    </div>
  );
}

export default TitleCog;

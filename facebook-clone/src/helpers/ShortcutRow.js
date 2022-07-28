import React from "react";
import "../helpers/ShortcutRow.css";

function ShortcutRow({ name, pic }) {
  return (
    <div className="shortcut">
      <img src={pic} />
      <p>{name}</p>
    </div>
  );
}

export default ShortcutRow;

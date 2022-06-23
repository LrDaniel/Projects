import React from "react";

function Toggle({ toggle, setToggle }) {
  return (
    <div>
      <label class="switch">
        <input
          type="checkbox"
          checked={toggle}
          onClick={(e) => setToggle(e.target.checked)}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default Toggle;

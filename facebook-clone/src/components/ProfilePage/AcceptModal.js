import React from "react";
import "../../styles/AcceptModal.css";

function AcceptModal({
  upload,
  reset,
  cover,
  profilepic,
  uploadPic,
  uploadCover,
}) {
  return (
    <div className="darkbg">
      <div className="accept-modal-content">
        <div className="accept-modal-title">
          <span>Are you sure you want to change?</span>
        </div>
        <div className="accept-modal-btns">
          {cover !== null ? (
            <button onClick={() => uploadCover()}>Change</button>
          ) : null}
          {profilepic !== null ? (
            <button onClick={() => uploadPic()}>Change</button>
          ) : null}
          <button onClick={() => reset()}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AcceptModal;

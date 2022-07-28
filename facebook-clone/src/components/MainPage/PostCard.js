import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import "../../styles/UploadPost.css";
import LiveIcon from "@material-ui/icons/LiveTv";
import PhotoIcon from "@material-ui/icons/Photo";
import FaceIcon from "@material-ui/icons/TagFaces";
import PostModal from "../PostModal";

function PostCard() {
  const [postModal, setPostModal] = useState(false);
  const { user, users } = useContext(AppContext);

  return (
    <div className="upload-post">
      {postModal ? (
        <PostModal setPostModal={setPostModal} user={user} users={users} />
      ) : null}
      <div className="upper-upload-post">
        <img src={user?.photoURL} />
        <div className="modal-up" onClick={() => setPostModal(true)}>
          <p>Whats on your mind, {user?.displayName}?</p>
        </div>
      </div>
      <hr />
      <div className="bottom-upload-post">
        <div className="live-video">
          <LiveIcon />
          <p> Live video</p>
        </div>
        <div className="photo-video">
          <PhotoIcon />
          <p> Photo/video</p>
        </div>
        <div className="feeling">
          <FaceIcon />
          <p> Feeling/activity</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

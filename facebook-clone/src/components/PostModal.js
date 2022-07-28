import React, { useState, useRef } from "react";
import "../styles/PostModal.css";
import CloseIcon from "@material-ui/icons/Close";
import SmileMoji from "@material-ui/icons/SentimentSatisfiedAlt";
import PhotoVid from "@material-ui/icons/Collections";
import Tag from "@material-ui/icons/LocalOffer";
import Smile from "@material-ui/icons/InsertEmoticon";
import Location from "@material-ui/icons/LocationOn";
import Event from "@material-ui/icons/Event";
import More from "@material-ui/icons/MoreHoriz";
import { v4 } from "uuid";
import {
  addDoc,
  collection,
  db,
  serverTimestamp,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase/firebase";

function PostModal({ setPostModal, user }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setimageURL] = useState(null);
  const [likes, setLikes] = useState(0);
  const [progress, setProgress] = useState(0);
  const uploadRef = useRef(null);

  const UploadImage = () => {
    uploadRef.current.click();
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setimageURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    console.log(imageURL);
    if (caption == "" && imageURL == "") {
      console.log("Cant upload");
    } else {
      e.preventDefault();
      if (image == "") {
        const docRef = await addDoc(collection(db, "posts"), {
          timestamp: serverTimestamp(),
          caption: caption,
          imageURL: "",
          likes: likes,
          username: user?.displayName,
          uid: user?.uid,
          userProfilePic: user.photoURL,
        });

        setPostModal(false);
        setCaption("");
        setImage(null);
      } else {
        const storageRef = ref(storage, `images/${image.name + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => {
            console.log(error);
          },

          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              const docRef = await addDoc(collection(db, "posts"), {
                timestamp: serverTimestamp(),
                caption: caption,
                imageURL: url,
                likes: likes,
                username: user?.displayName,
                uid: user?.uid,
                userProfilePic: user.photoURL,
              });
            });
            setPostModal(false);
            setCaption("");
            setImage(null);
          }
        );
      }
    }
  };

  return (
    <div className="post-modal">
      <div className="post-modal-content">
        <div className="top-content">
          <p>Create post</p>
          <CloseIcon onClick={() => setPostModal(false)} />
        </div>
        <hr />
        <div className="post-modal-user">
          <img src={user?.photoURL} />
          <p>{user?.displayName}</p>
        </div>
        <textarea
          id={
            caption.length < 70 ? "post-modal-caption" : "post-modal-caption-ex"
          }
          value={caption}
          placeholder={`Whats's on your mind , ${user?.displayName}?`}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        {imageURL ? (
          <div>
            <img className="img-preview" src={imageURL} />{" "}
            <button className="del-img" onClick={() => setimageURL(null)}>
              X
            </button>
          </div>
        ) : null}
        <div className="post-modal-emoji">
          <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png" />
          <SmileMoji />
        </div>
        <div className="post-modal-add-to">
          <p>Add to your post</p>
          <div className="post-modal-add-to-icons">
            <div id="post-modal-add-to-icons-photo">
              <PhotoVid onClick={UploadImage} />
              <input
                style={{ display: "none" }}
                ref={uploadRef}
                type="file"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div id="post-modal-add-to-icons-tag">
              <Tag />
            </div>
            <div id="post-modal-add-to-icons-smile">
              <Smile />
            </div>
            <div id="post-modal-add-to-icons-location">
              <Location />
            </div>
            <div id="post-modal-add-to-icons-event">
              <Event />
            </div>
            <div id="post-modal-add-to-icons-more">
              <More />
            </div>
          </div>
        </div>
        <input
          className="postbtn"
          type="submit"
          value="Post"
          disabled={caption ? false : true}
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  );
}

export default PostModal;

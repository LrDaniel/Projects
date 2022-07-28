import React, { useState, useEffect } from "react";
import "../../styles/Intro.css";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import School from "@material-ui/icons/School";
import House from "@material-ui/icons/House";
import LocationOn from "@material-ui/icons/LocationOn";
import Favorite from "@material-ui/icons/Favorite";
import Instagram from "@material-ui/icons/Instagram";
import Public from "@material-ui/icons/Public";

import { doc, db, getDoc, updateDoc } from "../../firebase/firebase";

function Intro({ userId, bio }) {
  const [currentBio, setCurrentBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [editBio, setEditBio] = useState(false);

  //   useEffect(() => {
  //     const getBio = async () => {
  //       const docRef = doc(db, "users", userId);
  //       const docSnap = await getDoc(docRef);
  //       console.log(docSnap.data());
  //       setCurrentBio(docSnap.data().bio);
  //       console.log(docSnap.data());
  //     };
  //     getBio();
  //   }, []);

  const updateBio = () => {
    const docRef = doc(db, "users", userId);
    updateDoc(docRef, {
      bio: newBio,
    }).then(() => {
      setCurrentBio(newBio);
      setEditBio(false);
    });
  };
  return (
    <div className="intro-container">
      <div className="intro">
        <p>Intro</p>
      </div>
      {editBio ? (
        <div className="change-bio">
          <div className="bio-input">
            <input type="text" onChange={(e) => setNewBio(e.target.value)} />
            <p>{101 - newBio.length} characters remaining</p>
          </div>
          <div className="bottom-bio">
            <div className="public">
              <p>
                <Public />
                Public
              </p>
            </div>
            <div className="bio-btns">
              <button className="cancel-btn" onClick={() => setEditBio(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => updateBio()}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="bio">{editBio ? null : <p>{bio}</p>}</div>
      {editBio ? null : <span onClick={() => setEditBio(true)}>Edit bio</span>}
      <div className="personal-info">
        <p>
          <BusinessCenter />
          Works at Uber Technologies
        </p>
        <p>
          <School />
          Went to Harvard
        </p>
        <p>
          <House />
          Lives in Massachusetts , USA
        </p>
        <p>
          <LocationOn />
          From California , USA
        </p>
        <p>
          <Favorite />
          In a relationship with Coding
        </p>
        <p>
          <Instagram />
          <a href="#">Insta_link</a>
        </p>
      </div>
      <div className="intro-btns">
        <span>Edit detail</span>
        <span>Add hobbies</span>
        <span>Add featured</span>
      </div>
    </div>
  );
}

export default Intro;

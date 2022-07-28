import React, { useState, useEffect, useRef } from "react";
import "../../styles/TopPageProfile.css";
import CameraAlt from "@material-ui/icons/CameraAlt";
import Create from "@material-ui/icons/Create";
import AddCircle from "@material-ui/icons/AddCircle";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import {
  getAuth,
  auth,
  ref,
  storage,
  uploadBytesResumable,
  getDownloadURL,
  db,
  doc,
  updateProfile,
  getDocs,
  query,
  collection,
  where,
  updateDoc,
} from "../../firebase/firebase";
import AcceptModal from "./AcceptModal";
import { v4 } from "uuid";

function TopPageProfile({ user, users }) {
  const [fillter, setFillter] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [profilePicProg, setProfilePicProg] = useState(null);
  const [coverPicProg, setCoverPicProg] = useState(null);

  const profilePicRef = useRef(null);
  const coverPicRef = useRef(null);

  useEffect(() => {
    const f = users?.filter(
      (eachuser) => eachuser.displayName !== auth.currentUser.displayName
    );
    setFillter(f);
  }, [users, user]);

  const AddProfilePic = () => {
    profilePicRef.current.click();
  };

  const AddCoverPic = () => {
    coverPicRef.current.click();
  };

  const handleChangeProfile = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      setConfirm(true);
    }
    setConfirm(true);
  };
  const handleChangeCover = (e) => {
    if (e.target.files[0]) {
      setCoverPic(e.target.files[0]);
    }
    setConfirm(true);
  };

  const uploadProfilePic = () => {
    if (!profilePic) return;
    const storageRef = ref(
      storage,
      `/profilePics/${auth.currentUser.uid}/${profilePic.name + v4()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, profilePic);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfilePicProg(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            updateDoc(docRef, {
              photoURL: url,
            }).then(() => {
              updateProfile(auth.currentUser, {
                photoURL: url,
              });
            });
          })
          .then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1300);
          });

        setProfilePic(null);
        setProfilePicProg(null);
        setConfirm(false);
      }
    );
  };

  const uploadCoverPic = () => {
    if (!coverPic) return;
    const storageRef = ref(
      storage,
      `/CoverPics/${auth.currentUser.uid}/${coverPic.name + v4()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, coverPic);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfilePicProg(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            updateDoc(docRef, {
              coverPhoto: url,
            });
          })
          .then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1300);
          });
        setCoverPic(null);
        setCoverPicProg(null);
        setConfirm(false);
      }
    );
  };

  const resetAll = () => {
    setCoverPic(null);
    setProfilePic(null);
    setConfirm(false);
  };

  return (
    <div className="top-page-container">
      {confirm ? (
        <AcceptModal
          cover={coverPic}
          profilepic={profilePic}
          uploadPic={uploadProfilePic}
          uploadCover={uploadCoverPic}
          reset={resetAll}
        />
      ) : null}
      <div className="top-page-middle">
        <div className="cover-photo">
          <img src={user?.coverPhoto} />
          <span class="add-cover" onClick={() => AddCoverPic()}>
            <CameraAlt />
            <span>Add Cover Photo</span>
            <input
              style={{ display: "none" }}
              ref={coverPicRef}
              type="file"
              onChange={(e) => {
                handleChangeCover(e);
              }}
            />
          </span>
        </div>
        <div className="below-cover">
          <div className="big-pic">
            <img src={user?.photoURL} />
            <div onClick={() => AddProfilePic()}>
              <CameraAlt />
            </div>
            <input
              style={{ display: "none" }}
              ref={profilePicRef}
              type="file"
              onChange={(e) => {
                handleChangeProfile(e);
              }}
            />
          </div>
          <div className="pic-side">
            <h1>{user?.displayName}</h1>
            <p>{fillter.length} Friends</p>
            {fillter?.map((eachuser) => {
              return <img src={eachuser?.photoURL} />;
            })}
          </div>
        </div>
        <div className="right-btns">
          <span class="add-story">
            <AddCircle />
            Add to story
          </span>
          <span class="edit-profile">
            <Create />
            Edit Profile
          </span>
        </div>
        <hr />
        <div className="below-cover-nav">
          <div className="below-cover-nav-left">
            <div>
              <span>Posts</span>
            </div>
            <span>About</span>
            <span>Friends</span>
            <span>Photos</span>
            <span>Videos</span>
            <span>Check-ins</span>
            <span className="more">
              More <ArrowDropDown />
            </span>
          </div>
          <div className="below-cover-nav-right">
            <MoreHoriz />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopPageProfile;

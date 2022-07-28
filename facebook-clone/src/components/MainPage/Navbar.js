import React, { useState, useEffect } from "react";
import {} from "react-router-dom";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import GroupIcon from "@material-ui/icons/GroupOutlined";
import StoreIcon from "@material-ui/icons/StoreOutlined";
import Groups from "@material-ui/icons/GroupWorkOutlined";
import Watch from "@material-ui/icons/OndemandVideoOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import ChatIcon from "@material-ui/icons/ChatBubble";
import BellIcon from "@material-ui/icons/Notifications";
import LeftArrowIcon from "@material-ui/icons/ArrowForwardIos";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import DisplayIcon from "@material-ui/icons/SettingsBrightness";
import FeedbackIcon from "@material-ui/icons/Feedback";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ContactRow from "../../helpers/ContactRow";
import GreyRow from "../../helpers/GreyRow";
import { useLocation, useNavigate } from "react-router-dom";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

import { auth, collection, db, getDocs } from "../../firebase/firebase";

function Navbar({ user, users, setUsers }) {
  const [searchUsers, setSearchUsers] = useState("");
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [profileModal, setPorfileModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);

  const [currentRoot, setCurrentRoot] = useState("");
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentRoot(pathname);
  }, [pathname]);

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      let myusers = [];
      querySnapshot.forEach((doc) => {
        myusers.push(doc.data());
      });
      setUsers(myusers);
      if (users.length !== 0) {
        const filteredData = users.filter((user) => {
          return (
            user.displayName
              .toLowerCase()
              .indexOf(searchUsers.toLowerCase()) !== -1
          );
        });
        setfilteredUsers(filteredData);
      }
    };
    getUsers();
  }, [searchUsers]);

  const inputOnChange = (e) => {
    setSearchUsers(e.target.value);
    setSearchModal(true);
  };

  const openModal = () => {
    setSearchModal(true);
  };

  const logout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="nav-container">
      <div className="left-nav">
        {searchModal ? (
          <ArrowIcon onClick={() => setSearchModal(false)} />
        ) : (
          <Link to="/home">
            <img
              src="https://i.ibb.co/72dN4JJ/Facebook-icon-2019-1.png"
              class="flogo"
            />
          </Link>
        )}

        <input
          className="nav-search"
          type="text"
          placeholder="Search Facebook"
          onChange={(e) => inputOnChange(e)}
          onClick={openModal}
          value={searchUsers}
        />
      </div>
      <div className={searchModal ? "searchBox" : "searchBoxNone"}>
        <div className="searchUsers">
          {filteredUsers.map((user) => {
            return (
              <ContactRow
                img={user?.photoURL}
                name={user?.displayName}
                uid={user?.uid}
              />
            );
          })}
        </div>
      </div>

      <div className="middle-nav">
        <HomeIcon
          onClick={() => navigate("/home")}
          className={currentRoot === "/home" ? "selected" : "notselected"}
        />
        <GroupIcon
          onClick={() => navigate("/friends")}
          className={pathname.includes("/friends") ? "selected" : "notselected"}
        />
        <Watch
          onClick={() => navigate("/watch")}
          className={currentRoot === "/watch" ? "selected" : "notselected"}
        />
        <StoreIcon
          onClick={() => navigate("/market")}
          className={currentRoot === "/market" ? "selected" : "notselected"}
        />

        <Groups
          onClick={() => navigate("/groups")}
          className={currentRoot === "/groups" ? "selected" : "notselected"}
        />
      </div>
      <div className="right-nav">
        <AppsIcon />
        <ChatIcon />
        <div
          onClick={() => {
            setNotificationModal(!notificationModal);
            setPorfileModal(false);
          }}
        >
          <BellIcon />
        </div>

        <div className="profile-img">
          <img
            src={user?.photoURL}
            onClick={() => {
              setPorfileModal(!profileModal);
              setNotificationModal(false);
            }}
          />
        </div>
      </div>
      <div className={profileModal ? "profileModal" : "profileModal-none"}>
        <div className="small-profile-card">
          <div
            className="top-small-profile-card"
            onClick={() => {
              navigate(`/profile/${user.uid}`);
              setPorfileModal(false);
            }}
          >
            <img src={user?.photoURL} />
            <a href="#">{user?.displayName}</a>
          </div>
          <hr />
          <div className="bottom-small-profile-card">
            <p>See All Profiles</p>
          </div>
        </div>
        <div className="profileModalbtn">
          <GreyRow
            title="Settings & privacy"
            icon1={<SettingsIcon />}
            icon2={<LeftArrowIcon />}
          />
          <GreyRow
            title="Help & Support"
            icon1={<HelpIcon />}
            icon2={<LeftArrowIcon />}
          />
          <GreyRow
            title="Display & Accessibility"
            icon1={<DisplayIcon />}
            icon2={<LeftArrowIcon />}
          />
          <GreyRow title="Give feedback" icon1={<FeedbackIcon />} />
          <div onClick={logout}>
            <GreyRow title="Log Out" icon1={<LogoutIcon />} />
          </div>
        </div>
      </div>
      <div
        className={
          notificationModal ? "notification-modal" : "notification-modal-hide"
        }
      >
        <div className="top-notification-modal">
          <p>Notifications</p>
          <MoreHoriz />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import React, { useContext, useState } from "react";
import LeftSideBarRow from "../../helpers/LeftSideBarRow";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import DownArrowIcon from "@material-ui/icons/KeyboardArrowDown";
import UpArrowIcon from "@material-ui/icons/ArrowUpward";
import "../../styles/HomeLeftSideBar.css";
import ShortcutRow from "../../helpers/ShortcutRow";
import { useNavigate } from "react-router-dom";
import { auth, getAuth } from "../../firebase/firebase";

function HomeLeftSideBar() {
  const [expanded, setExpanded] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(auth.currentUser);

  return (
    <div className="left-side-bar">
      <div onClick={() => navigate(`/profile/${user.uid}`)}>
        <LeftSideBarRow
          title={user?.displayName}
          icon={auth?.currentUser?.photoURL}
        />
      </div>

      <LeftSideBarRow
        title="Friends"
        icon="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png"
      />
      <LeftSideBarRow
        title="Facebook Pay"
        icon="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/GJ4EaivDaSj.png"
      />
      <LeftSideBarRow
        title="Groups"
        icon="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png"
      />
      <LeftSideBarRow
        title="Marketplace"
        icon="https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png"
      />
      <LeftSideBarRow
        title="Watch"
        icon="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png"
      />

      <div className={expanded ? "expanded" : "collapsed"}>
        <LeftSideBarRow
          title="Memories"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/he-BkogidIc.png"
        />
        <LeftSideBarRow
          title="Ad Center"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/CwKNCefmHON.png"
        />
        <LeftSideBarRow
          title="Ads Manager"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/DHBHg9MEeSC.png"
        />

        <LeftSideBarRow
          title="Blood Donations"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/bRC_jZ58syg.png"
        />

        <LeftSideBarRow
          title="COVID-10 Information Center"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/5rR6LRpNc5u.png"
        />

        <LeftSideBarRow
          title="Crisis response"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/cT5nPnO8Wsc.png"
        />

        <LeftSideBarRow
          title="Emotional Health"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/vxMUnHhu6Do.png"
        />

        <LeftSideBarRow
          title="Events"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/eXC82ZeepQ7.png"
        />

        <LeftSideBarRow
          title="Favorites"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/mAnT0r8GSOm.png"
        />

        <LeftSideBarRow
          title="Fundraisers"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/n2vd2VduYc1.png"
        />

        <LeftSideBarRow
          title="Gaming Video"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/JN4tUY_MDMK.png"
        />

        <LeftSideBarRow
          title="Live Videos"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/AisrwUSvQf8.png"
        />

        <LeftSideBarRow
          title="Messanger"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png"
        />

        <LeftSideBarRow
          title="Most Recent"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/hTN47HVa4oS.png"
        />

        <LeftSideBarRow
          title="Pages"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png"
        />

        <LeftSideBarRow
          title="Play Games"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PObY9OA5lvJ.png"
        />

        <LeftSideBarRow
          title="Recent ad activity"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/8OasGoQgQgF.png"
        />

        <LeftSideBarRow
          title="Saved"
          icon="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png"
        />
      </div>
      <div onClick={() => setExpanded(!expanded)}>
        <LeftSideBarRow
          title={expanded ? "See less" : "See more"}
          svg={expanded ? <UpArrowIcon /> : <DownArrowIcon />}
        />
      </div>
      <hr />
      <div className="shortcuts">
        <h3>Your shortcuts</h3>
        <ShortcutRow
          name="Full Stack Web Devs"
          pic="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&w=1000&q=80"
        />
        <ShortcutRow
          name="8 Ball Pool"
          pic="https://scontent.fhfa2-2.fna.fbcdn.net/v/t39.2081-6/42630609_2166936443330818_3464735768197464064_n.png?stp=c1.1.72.72a_dst-png_p72x72&_nc_cat=1&ccb=1-7&_nc_sid=eaa83b&_nc_ohc=wbwWGerqxCgAX-UdPuv&_nc_ht=scontent.fhfa2-2.fna&oh=00_AT9Cd3qZxbcYZBXj7ROV6CzntzVEbmadEox-lIxIFBSDtw&oe=62E3EAEF"
        />
        <ShortcutRow
          name="Backgammon King Online"
          pic="https://scontent.fhfa2-2.fna.fbcdn.net/v/t39.2081-6/12057000_438536356351704_1310212141_n.png?stp=c1.1.72.72a_dst-png_p72x72&_nc_cat=1&ccb=1-7&_nc_sid=eaa83b&_nc_ohc=M16Pq_4PzG4AX9NpDRk&_nc_ht=scontent.fhfa2-2.fna&oh=00_AT-jYLqxatzOJyYWZ_JU5If01GjD0A3WkMzNp0UkGfbJqA&oe=62E33A4A"
        />
        <ShortcutRow
          name="Coin Master"
          pic="https://scontent.fhfa2-2.fna.fbcdn.net/v/t39.2081-6/12512181_774488585988936_247651205_n.png?stp=c1.1.72.72a_dst-png_p72x72&_nc_cat=1&ccb=1-7&_nc_sid=eaa83b&_nc_ohc=NBvB8MVzxuUAX_YgTmn&tn=7pugwXB2f469_h0n&_nc_ht=scontent.fhfa2-2.fna&oh=00_AT8FbBEd6s489ZXCXjFb6acTp8AO1CXy2Zs-_JHvgxFTMA&oe=62E444DA"
        />
        <ShortcutRow
          name="Texas HoldEm Poker"
          pic="https://scontent.fhfa2-2.fna.fbcdn.net/v/t39.2081-6/27045397_10155399661101229_4188312396068028416_n.png?stp=c1.1.72.72a_dst-png_p72x72&_nc_cat=1&ccb=1-7&_nc_sid=eaa83b&_nc_ohc=YpgXqIt0TQYAX9WCvzZ&_nc_ht=scontent.fhfa2-2.fna&oh=00_AT8bckzpxhgX4-g-HAyq3NHPwKju1NE-SyzAUOW_d49GbQ&oe=62E4A04E"
        />

        <LeftSideBarRow title={"See more"} svg={<DownArrowIcon />} />
      </div>
    </div>
  );
}

export default HomeLeftSideBar;

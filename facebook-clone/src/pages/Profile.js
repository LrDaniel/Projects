import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopPageProfile from "../components/ProfilePage/TopPageProfile";
import Intro from "../components/ProfilePage/Intro";
import PostCard from "../components/MainPage/PostCard";
import Post from "../components/Post";
import moment from "moment";
import {
  db,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
} from "../firebase/firebase";
import "../styles/Profile.css";

function Profile({ user, users }) {
  const [ProfileUserData, setProfileUserData] = useState([]);
  const { uid } = useParams();
  const [usersPosts, setUsersPost] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "users", uid);
    getDoc(docRef).then((doc) => {
      setProfileUserData(doc.data());
    });
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("uid", "==", ProfileUserData?.uid)
      );
      const querySnapshot = await getDocs(q);
      let posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), postId: doc.id });
      });
      setUsersPost(posts);
    };
    getPosts();
  }, [ProfileUserData]);

  return (
    <div className="profile-page-container">
      <TopPageProfile user={ProfileUserData} users={users} />
      <div className="bottom-container">
        <div className="left-profile">
          <Intro userId={ProfileUserData?.uid} bio={ProfileUserData?.bio} />
        </div>
        <div className="right-profile">
          <PostCard />
          {usersPosts?.map((post, id) => {
            let date = new Date(post.timestamp?.seconds * 1000);
            let timeAgo = moment(date).fromNow();
            return (
              <Post
                key={id}
                name={post?.username}
                time={timeAgo}
                like={post?.likes}
                pic={post?.imageURL}
                profilePic={post?.userProfilePic}
                userId={post?.uid}
                caption={post?.caption}
                postId={post?.postId}
                currentUser={user}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;

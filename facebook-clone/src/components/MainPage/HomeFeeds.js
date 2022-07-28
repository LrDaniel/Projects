import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import StoryFeed from "./StoryFeed";
import "../../styles/HomeFeeds.css";
import PostCard from "./PostCard";
import CreateRoom from "../CreateRoom";
import Post from "../Post";
import moment from "moment";
import {
  collection,
  db,
  getDocs,
  docs,
  orderBy,
  query,
} from "../../firebase/firebase";

function HomeFeed() {
  const { user, users } = useContext(AppContext);
  const [postData, setPostData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
      let Data = [];
      querySnapshot.forEach(async (doc) => {
        Data.push({ ...doc.data(), postId: doc.id });
      });
      Data.reverse();
      setPostData(Data);
    };

    fetchData();
  }, [postData]);

  return (
    <div className="home-feed-container">
      <div className="storys-feed">
        <StoryFeed />
      </div>
      <div>
        <PostCard />
      </div>
      <div>
        <CreateRoom users={users} />
      </div>
      <div>
        {postData?.length > 0
          ? postData?.map((post, id) => {
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
            })
          : null}
      </div>
    </div>
  );
}

export default HomeFeed;

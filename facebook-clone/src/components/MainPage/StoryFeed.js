import React, { useContext } from "react";
import CreateStoryCard from "../../helpers/CreateStoryCard";
import StoryCard from "../../helpers/StoryCard";
import { AppContext } from "../../App";
import "../../styles/StoryFeed.css";

function StoryFeed() {
  const { user } = useContext(AppContext);

  return (
    <div className="story-cards-container">
      <CreateStoryCard user={user} />
      <StoryCard
        name="Brandon John"
        pic="https://i.pinimg.com/564x/1a/3b/be/1a3bbe156954bb7a293243287eb4ef20.jpg"
        profilePic="https://i.pinimg.com/564x/4a/1c/59/4a1c590c373729428efb50b6945cc9d4.jpg"
      />
      <StoryCard
        name="Shihori Obata"
        pic="https://i.pinimg.com/564x/85/f7/3b/85f73bfa9b507d231256f0ccc57e3c21.jpg"
        profilePic="https://i.pinimg.com/564x/d5/51/77/d5517728206858601c489b94a522f168.jpg"
      />
      <StoryCard
        name="Chi-Chan"
        pic="https://i.pinimg.com/564x/d0/db/d7/d0dbd7795caccf023c9394c4659c5b42.jpg"
        profilePic="https://i.pinimg.com/564x/d0/8b/9c/d08b9c59bca31e4f3026b374fd9d8415.jpg"
      />
      <StoryCard
        name="Yanna"
        pic="https://i.pinimg.com/564x/b2/87/4d/b2874d6989e383875c081596b1ed37a4.jpg"
        profilePic="https://i.pinimg.com/564x/86/48/40/864840bf4c04e788ceea227ae67410c1.jpg"
      />
    </div>
  );
}

export default StoryFeed;

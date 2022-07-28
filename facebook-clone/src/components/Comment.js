import React, { useEffect, useState } from "react";
import "../styles/Comment.css";
import { db, doc, getDoc, where } from "../firebase/firebase";

function Comment({ comment, pic, time, name, id }) {
  const [commentPic, setCommentPic] = useState("");

  useEffect(() => {
    const getProfilePic = async () => {
      if (id) {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setCommentPic(docSnap.data().photoURL);
      }
    };
    getProfilePic();
  }, []);

  return (
    <div className="reply-container">
      <img src={commentPic} />
      <div className="reply">
        <div className="bubble">
          <h4>{name}</h4>
          <p>{comment}</p>
        </div>
        <div className="under-comment">
          <p className="under-comment-p">Like</p>
          <p className="under-comment-p">Reply</p>
          <p className="time">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;

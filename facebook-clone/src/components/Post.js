import React, { useEffect, useState } from "react";
import "../styles/Post.css";
import Like from "@material-ui/icons/ThumbUpAltOutlined";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import Send from "@material-ui/icons/SendOutlined";
import Likes from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import {
  collection,
  addDoc,
  db,
  doc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
  getDoc,
} from "../firebase/firebase";
import Comment from "../components/Comment";

function Post({ name, time, pic, like, caption, userId, postId, currentUser }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [posterimage, setPosterImage] = useState(null);
  const [commentorId, setCommentorId] = useState("");

  useEffect(() => {
    const docRef = doc(db, "posts", postId);
    const colRef = query(collection(docRef, "comments"), orderBy("timestamp"));
    getDocs(colRef).then((snapshot) => {
      let comments = [];
      snapshot.docs.forEach((doc) => {
        comments.push({ ...doc.data() });
      });
      setComments(comments);
    });
  }, [comments]);

  useEffect(() => {
    const getProfilePic = async () => {
      if (userId) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        setPosterImage(docSnap.data().photoURL);
      }
    };
    getProfilePic();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const docRef = doc(db, "posts", postId);
    const colRef = collection(docRef, "comments");
    addDoc(colRef, {
      name: currentUser?.displayName,
      pic: currentUser?.photoURL,
      comment: comment,
      userId: currentUser?.uid,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post-container">
      <div className="top-post">
        <img className="profilepic-post" src={posterimage} />
        <div className="name-date">
          <h4>{name}</h4>
          <p>{time}</p>
        </div>
      </div>
      <div className="caption">{caption}</div>
      <div>
        {pic ? (
          <div>
            <img className="pic-post" src={pic} />
          </div>
        ) : null}
      </div>
      <div className="like-comment-bar">
        <div className="like-comment-left">
          <Likes />
          <p>{like}</p>
        </div>
        <div className="like-comment-right">
          {comments.length > 1 ? (
            <p>{comments.length} Comments</p>
          ) : (
            <p>{comments.length} Comment</p>
          )}
        </div>
      </div>
      <hr />

      <div className="like-comment-send-bar">
        <div className="like">
          <Like />
          <p>Like</p>
        </div>

        <div className="comment">
          <CommentIcon />
          <p>Comment</p>
        </div>
        <div className="send">
          <Send />
          <p>Send</p>
        </div>
      </div>
      <hr />
      <div className="comment-container">
        <div className="answer">
          <img src={currentUser?.photoURL} />
          <form onSubmit={handleSubmit}>
            <input
              className="answer-input"
              type="text"
              placeholder="Write an answer..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <input
              type="submit"
              disabled={!comment}
              className="tranparent-sub"
            />
          </form>
        </div>
        <div className="comments">
          {comments.length > 0
            ? comments?.map((comment, id) => {
                let date = new Date(comment.timestamp?.seconds * 1000);
                let timeAgo = moment(date).fromNow();
                return (
                  <Comment
                    comment={comment.comment}
                    pic={comment.pic}
                    name={comment.name}
                    id={comment.userId}
                    time={timeAgo}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Post;

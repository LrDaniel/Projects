import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginCard.css";
import "../../styles/Modal.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function LoginCard({ setRegModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in Successfuly ", auth.uid);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePass = () => {
    setShowPass(!showPass);
    setTimeout(() => {
      setShowPass(false);
    }, 1000);
  };
  return (
    <>
      <div className="Card">
        <input
          type="text"
          className="email-input"
          placeholder="Email or phone number"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pass-container">
          <input
            type={showPass ? "text" : "password"}
            className="pass-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="showpass" onClick={handlePass}>
            {showPass ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        <button onClick={(e) => login(e)} className="login-btn">
          Log In
        </button>
        <a href="#">Forgot Password?</a>
        <hr />
        <button onClick={() => setRegModal(true)} className="register-btn">
          {" "}
          Create new account
        </button>
      </div>
      <p className="bottom-text">
        <a href="#">Create a Page</a> for a celebrity, brand or business
      </p>
    </>
  );
}

export default LoginCard;

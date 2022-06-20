import { FormContext } from "../Button/Button";
import { useContext, useState } from "react";
import Axios from "axios";
import { AppContext } from "../../App";
import "./Login.css";
const Login = () => {
  const { setCurrentId } = useContext(AppContext);
  const [loginStatus, setLoginStatus] = useState("");
  const {
    setLogin,
    password,
    setPassword,
    usernameEmail,
    setUsernameEmail,
    setName,
  } = useContext(FormContext);

  const login = (e) => {
    Axios.post("/login", {
      usernameemail: usernameEmail,
      password: password,
    })
      .then((res) => {
        if (res.data.msg) {
          setLoginStatus(res.data.msg);
          setName(res.data.name);
          setCurrentId(res.data.userid);
          setTimeout(() => {
            setLogin(false);
          }, 500);
        } else {
          setLoginStatus("Invalid credentials");
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <>
      <div className="sign_in_overlay">
        <form className="sign_in">
          <button className="exit_log" onClick={() => setLogin(false)}>
            X
          </button>

          <label>Username or Email:</label>
          <input
            type="text"
            onChange={(e) => {
              setUsernameEmail(e.target.value);
            }}
            placeholder="Email..."
            required
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password..."
            required
          />
          <button className="sub_btn" onClick={login}>
            Login
          </button>
          <h4>{loginStatus}</h4>
        </form>
      </div>
    </>
  );
};

export default Login;

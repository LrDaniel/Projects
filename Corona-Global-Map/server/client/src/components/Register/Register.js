import { FormContext } from "../Button/Button";
import { useContext, useState } from "react";
import Axios from "axios";
import "./Register.css";

const Register = () => {
  const [regStatus, setRegStatus] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const {
    setReg,
    regUser,
    setRegUser,
    regPass,
    setRegPass,
    regEmail,
    setRegEmail,
    regName,
    setRegName,
    setLogin,
  } = useContext(FormContext);

  const register = () => {
    Axios.post("/register", {
      username: regUser,
      email: regEmail,
      password: regPass,
      name: regName,
    }).then((res) => {
      if (res.data.created) {
        setRegStatus(res.data.created);
      } else {
        setRegStatus(res.data.error);
      }
    });
  };

  const checkPass = (e) => {
    if (confirmPass === regPass) {
      register();
      setTimeout(() => {
        setLogin(true);
        setReg(false);
      }, 1200);
    } else {
      setRegStatus("Passwords don't match");
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="register_overlay">
        <form className="register">
          <button className="exit_reg" onClick={() => setReg(false)}>
            X
          </button>
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => {
              setRegName(e.target.value);
            }}
            placeholder="Name..."
            required
          />
          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => {
              setRegUser(e.target.value);
            }}
            placeholder="Username..."
            required
          />
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => {
              setRegEmail(e.target.value);
            }}
            placeholder="Email..."
            required
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => {
              setRegPass(e.target.value);
            }}
            placeholder="Password..."
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Password..."
            required
          />
          <button className="reg_btn" onClick={checkPass}>
            Register
          </button>
          <h4 className="reg_status">{regStatus}</h4>
        </form>
      </div>
    </>
  );
};

export default Register;

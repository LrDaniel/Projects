import "./Button.css";
import { useState, createContext, useContext } from "react";
import { AppContext } from "../../App";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";

import { DropdownButton, Dropdown } from "react-bootstrap";

export const FormContext = createContext();
const Button = () => {
  const { setFavoritesModal, setCurrentId } = useContext(AppContext);
  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const sign = () => {
    setLogin(true);
    setForm(false);
  };

  const regis = () => {
    setReg(true);
    setForm(false);
  };

  return (
    <>
      <div>
        <FormContext.Provider
          value={{
            setForm,
            setLogin,
            setReg,
            regUser,
            setRegUser,
            regPass,
            setRegPass,
            regEmail,
            setRegEmail,
            regName,
            setRegName,
            usernameEmail,
            setUsernameEmail,
            password,
            setPassword,
            setName,
          }}
        >
          {name.length < 1 ? (
            <>
              <button className="login_button" onClick={() => setForm(true)}>
                Sign in / Register
              </button>
            </>
          ) : (
            <>
              <div className="dropdown">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={`Welcome ${name}`}
                >
                  <Dropdown.Item
                    onClick={() => {
                      setFavoritesModal(true);
                    }}
                  >
                    Favorites
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setCurrentId(null);
                      setName("");
                    }}
                  >
                    Signout
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </>
          )}
          {form ? (
            <div className="small_modal_overlay" onClick={() => setForm(false)}>
              <div className="small_modal">
                <button onClick={sign}>Sign in</button>
                <button onClick={regis}>Register</button>
              </div>
            </div>
          ) : null}
          {login ? <Login /> : null}
          {reg ? <Register /> : null}
        </FormContext.Provider>
      </div>
    </>
  );
};

export default Button;

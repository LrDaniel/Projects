import React, { useState, createContext } from "react";
import AddAccountCard from "../components/LogAndReg/AddAccountCard";
import LoginCard from "../components/LogAndReg/LoginCard";
import Footer from "../components/LogAndReg/Footer";
import RegisterModal from "../components/LogAndReg/RegisterModal";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase/firebase";
import "../styles/LogAndReg.css";

export const LogRegContext = createContext();

function LogAndReg() {
  const [regModal, setRegModal] = useState(false);

  return (
    <LogRegContext.Provider>
      <div className="whole-container">
        {regModal ? <RegisterModal setRegModal={setRegModal} /> : null}
        <div className="log-container">
          <div className="left-half">
            <h1 style={{ color: "#1976f2", fontSize: "48px" }}>facebook</h1>
            <h3>Recent Logins</h3>
            <p>Click your picture or add an account</p>
            <div>
              <AddAccountCard />
              <AddAccountCard />
              <AddAccountCard />
            </div>
          </div>

          <div className="right-half">
            <LoginCard setRegModal={setRegModal} />
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </LogRegContext.Provider>
  );
}

export default LogAndReg;

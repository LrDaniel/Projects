import "./App.css";
import Navbar from "./components/Navbar";
import CoinsPage from "./pages/CoinsPage";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<CoinsPage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddMap } from "./pages/addMap";
import { AddCustomer } from "./pages/addCustomer";
import { ViewMap } from "./pages/viewMap";
import { Home } from "./pages/home";
import Service from "./services/Service";
function App() {
  return (
    <>
    <Service/>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addMap" element={<AddMap />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/viewMap/:id" element={<ViewMap />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;

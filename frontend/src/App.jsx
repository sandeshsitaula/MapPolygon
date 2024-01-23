import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ServiceAreaInterface } from "./pages/serviceAreaInterface";
import { AlertInterface } from "./pages/alertInterface";
import { CustomerInterface } from "./pages/customerInterface";
import {MainLayout} from './pages/layout.jsx'
import {AddNewServiceArea} from './pages/newServiceArea'
import {UserInfo} from "./components/UserInfo";


function App() {
  return (
    <>

      { <Router>
        <Routes>
          <Route path="/customerInterface" element={<MainLayout><CustomerInterface /></MainLayout>} />
          <Route path="/alertInterface" element={<MainLayout><AlertInterface /></MainLayout>} />
          <Route path="/serviceAreaInterface/" element={<MainLayout><ServiceAreaInterface /></MainLayout>} />
          <Route path="/newServiceArea/" element={<AddNewServiceArea />} />
        </Routes>
      </Router>  }
    </>
  );
}

export default App;

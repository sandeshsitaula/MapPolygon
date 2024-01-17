import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddMap } from "./pages/addMap";
import { ViewMap } from "./pages/viewMap";
import { Home } from "./pages/home";
import {MainLayout} from './pages/layout.jsx'
import {EditCustomer} from './components/EditCustomer'
function App() {
  return (
    <>
      {<Router>
        <Routes>
          <Route path="/" element={<MainLayout>   <EditCustomer customerId="120"/>
</MainLayout>} />
          <Route path="/addMap" element={<MainLayout><AddMap /></MainLayout>} />
          <Route path="/viewMap/:id" element={<MainLayout><ViewMap /></MainLayout>} />
        </Routes>
      </Router> }
    </>
  );
}

export default App;

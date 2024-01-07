import { useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {AddMap} from './pages/map'
import {Home} from './pages/home';
function App() {

  return (
    <>
       <Router>
    <Routes>
       <Route path="/" element={<Home />} />
      <Route path="/addMap" element={<AddMap />} />
    </Routes>
  </Router>
    </>
  )
}

export default App

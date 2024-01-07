import { useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
//hmU6Dl3GcNZqWXt6Sy_Uz281sCHdfjGRxFO0bkJfuDU
import {AddMap} from './pages/map'
import {Home} from './pages/home';
function App() {
  useEffect(()=>{
    async function testing(){

      try{
const response = await axios.get('http://localhost:8000/api/index/');
console.log(response)
      }catch(error){
        console.log(error)
      }
    }

testing()
  },[])
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

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import AxiosInstance from "../axiosInstance";

import { UserInfo, FilterUserHeader } from '../components/UserInfo'
import { AddIcon } from '../components/AddIcon';
import { CustomerAddModal } from '../components/customerAddModal'

export function CustomerInterface() {
  const [customerData, setCustomerData] = useState(null)
  const [originalData,setOriginalData]=useState(null)
  const [customerUpdater, setCustomerUpdater] = useState(false)
  const [textContent, setTextContent] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [searchData,setSearchData]=useState([])


  function customerUpdaterToggler() {
    setCustomerUpdater(!customerUpdater)
  }
  function toggleTextContent() {
    setTextContent((prev) => !prev)
  }
  useEffect(() => {
    async function getAllCustomers() {
      try {
        const response = await AxiosInstance.get('api/customer/getAllCustomer/')
        setCustomerData(response.data.data)
        setOriginalData(response.data.data)
      }
      catch (error) {
        console.log(error)
        alert(error.data.error)
      }
    }
    getAllCustomers()
  }, [customerUpdater])


  return (
    <>

      {showCustomerModal && <CustomerAddModal customerUpdater={customerUpdaterToggler} setModal={setShowCustomerModal} />}

      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <FilterUserHeader searchData={searchData} setSearchData={setSearchData} setCustomerData={setCustomerData} originalData={originalData}/>


        {customerData && customerData.map((data) => {
          return(
          <UserInfo key={data.customer.id} customerUpdaterToggler={customerUpdaterToggler} data={data} />
          )})}

        <div>
        </div>

        {textContent && <div style={{ position: 'absolute', top: '60%', right: '5%' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}>
            <div onClick={() => setShowCustomerModal(true)} style={{ marginBottom: '10px', cursor: 'pointer' }}>Add Customer</div>
          </div>
          <AddIcon setTextContent={toggleTextContent} />
        </div>}
        {!textContent && <div style={{ position: 'absolute', top: '70%', right: '10%' }}>
          <AddIcon setTextContent={toggleTextContent} />
        </div>
        }
      </div>

    </>
  )
}

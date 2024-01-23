import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import { Button } from "react-bootstrap";
import AxiosInstance from '../axiosInstance'
import { CustomerDetail } from '../components/customerDetail'
import { AddAlertModal } from '../components/AddAlertModal'
import { AddIcon } from '../components/AddIcon'
import { AlertInfo, FilterAlertHeader } from '../components/alertInfo'

export function AlertInterface() {
  const [modalShow, setModalShow] = useState(false)
  const [textContent, setTextContent] = useState(false)
  const [alertUpdater, setAlertUpdater] = useState(false)
  const [alerts, setAlerts] = useState(null)

  const [originalData, setOriginalData] = useState(null)

  const [searchData,setSearchData]=useState([])
  function toggleAlertUpdater() {
    setAlertUpdater(!alertUpdater)
  }

  function toggleTextContent() {
    setTextContent((prev) => !prev)
  }


  useEffect(() => {
    async function getAlerts() {
      try {
        const response = await AxiosInstance.get('api/alert/allAlert')
        setAlerts(response.data.data)
        setOriginalData(response.data.data)
      }

      catch (error) {
        console.log(error)
        alert(error.response.data.error)
      }
    }
    getAlerts()
  }, [])
  return (
    <>
      {modalShow &&
        <AddAlertModal alertUpdater={toggleAlertUpdater} setModal={setModalShow} />}
      <div style={{ minHeight: '100vh' }}>

        <FilterAlertHeader searchData={searchData} setSearchData={setSearchData} setAlertData={setAlerts} originalData={originalData}/>

        {alerts && alerts.map((alert) => {
          return (
            <AlertInfo key={alert.alert.id} alert={alert.alert} service_area={alert.service_area} />
          )
        })}
      </div>

      {textContent && <div style={{ position: 'absolute', top: '60%', right: '5%' }}>
        <div style={{ backgroundColor: 'white', color: 'black', padding: '20px' }}>
          <div onClick={() => setModalShow(true)} style={{ cursor: 'pointer' }}>Create Alert</div>
        </div>
        <AddIcon setTextContent={toggleTextContent} />
      </div>}
      {!textContent && <div style={{ position: 'absolute', top: '70%', right: '10%' }}>
        <AddIcon setTextContent={toggleTextContent} />
      </div>
      }
    </>
  )
}

import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Marker,Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
import AxiosInstance from '../axiosInstance'
import {CustomerDetail} from '../components/customerDetail'

import {AddIcon} from '../components/AddIcon'

export function ServiceAreaInterface(){

  const [serviceArea,setServiceArea]=useState(null) //for displaying polygons
  const [customers,setCustomer]=useState(null)//for displaying users

  const [textContent,setTextContent]=useState(false)
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const ZOOM_LEVEL=localStorage.getItem('zoomLevelServiceArea')||12

 function toggleTextContent(){
   setTextContent((prev)=>!prev)
}

  useEffect(() => {
    const handleZoomChanged = () => {
      // Your code to run when the zoom level changes
      const map = mapRef.current;
      if (map) {
        const zoomLevel = map.getZoom();
        localStorage.setItem("zoomLevelServiceArea", zoomLevel);
      }
    };

    // Assuming mapRef.current is your reference to the map object
    const map = mapRef.current;
    // Check if the map object is available
    if (map) {
      // Add an event listener for the zoomChanged event
      map.on('zoomend', handleZoomChanged);
      // Clean up the event listener when the component is unmounted
      return () => {
        map.off('zoomend', handleZoomChanged);
      };
    }
  }, [serviceArea]); // Include mapRef and polygonId in the dependency array


const parsePolygon = (polygon) => {
    // Check if the polygon format includes SRID information
    const isSRIDIncluded = polygon.startsWith("SRID=4326;");

    // Extract the coordinates string (remove SRID information if present)
    const coordinatesString = isSRIDIncluded
      ? polygon.substring(20, polygon.length - 2)
      : polygon;
    // Split the coordinates into individual points
    const points = coordinatesString.split(",").map((coord) =>
      coord
        .trim()
        .split(/\s+/)
        .map((c) => parseFloat(c))
    );
    // Swap latitude and longitude for Leaflet

    const polygonCoordinates = points.map((point) => [point[1], point[0]]);
    return polygonCoordinates;
  };


  const mapRef = useRef();

  useEffect(()=>{
 async function GetServiceArea() {
      try {
        const response = await AxiosInstance.get("api/map/getAllPolygons/");
        setServiceArea(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetServiceArea();
  }, []);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await AxiosInstance.get('api/customer/getAllCustomerLocation/')
        setCustomer(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])


  /* -----------  for searching location -------- */
    const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault()
    handleSelect()
  }


  const handleSelect = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchValue}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCenter({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };


/*    for updating map */
    useEffect(() => {
    // Manually set the center of the map when the center state changes using useref
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], ZOOM_LEVEL);
    }
  }, [center]);


return(
  <>

 <div style={{ display: "flex",position:'absolute',right:'5%',zIndex:'10000' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search Location"
            />
          </Form>
          <Button  style={{marginLeft:'20px'}} onClick={handleSelect}>
            Submit
          </Button>
        </div>

          <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            style={{height:'100vh', width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {serviceArea &&serviceArea.map((area)=>{
              const coordinates=parsePolygon(area.polygon)
              return(
            <Polygon key={area.id} positions={coordinates} pathOptions={{ color: "blue" }} />
              )})}


            {customers && customers.map((customers) => {
              return (
                <Marker key={customers[0]} position={customers}>
                </Marker>
              )
            })
            }
          </MapContainer>

   {textContent && <div style={{zIndex:'10000',position:'absolute',top:'60%',right:'1%'}}>
   <div style={{backgroundColor:'white',color:'black',padding:'20px'}}>
  <Link style={{textDecoration:'none '}} to="/newServiceArea"> <div  style={{cursor:'pointer',color:'black',textDecoration:'none'}}>Create Service Area</div></Link>
    </div>
      <AddIcon  setTextContent={toggleTextContent}/>
    </div> }
    {!textContent &&<div style={{zIndex:'10000',position:'absolute',top:'70%',right:'10%'}}>
      <AddIcon setTextContent={toggleTextContent} />
      </div>
    }
  </>
)
}

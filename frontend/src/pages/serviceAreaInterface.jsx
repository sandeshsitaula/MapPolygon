import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Marker,Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from '../axiosInstance'
import {CustomerDetail} from '../components/customerDetail'

// function ShowSaved({ savedData }) {
//   const parsePolygon = (polygon) => {
//     // Check if the polygon format includes SRID information
//     const isSRIDIncluded = polygon.startsWith("SRID=4326;");

//     // Extract the coordinates string (remove SRID information if present)
//     const coordinatesString = isSRIDIncluded
//       ? polygon.substring(20, polygon.length - 2)
//       : polygon;
//     // Split the coordinates into individual points
//     const points = coordinatesString.split(",").map((coord) =>
//       coord
//         .trim()
//         .split(/\s+/)
//         .map((c) => parseFloat(c))
//     );
//     // Swap latitude and longitude for Leaflet

//     const polygonCoordinates = points.map((point) => [point[1], point[0]]);
//     return polygonCoordinates;
//   };
//   const mapRef = useRef();

//   return (
//     <div style={{ marginTop: "3rem", textAlign: "center", color: "white" }}>
//       <h3>Your Saved Data</h3>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           flexWrap: "wrap",
//           justifyContent: "center",
//         }}
//       >
//         {savedData
//           ? savedData.map((data) => {
//             const polygonCoordinates = parsePolygon(data.polygon);
//             const averageLat = polygonCoordinates.reduce((sum, coord) => sum + coord[0], 0) / polygonCoordinates.length;
//             const averageLng = polygonCoordinates.reduce((sum, coord) => sum + coord[1], 0) / polygonCoordinates.length;
//             const center = {
//               lat: averageLat,
//               lng: averageLng,
//             };
//             const zoomLevel = localStorage.getItem(`ZoomLevelPolygon${data.id}`) - 1 || 12;

//             return (
//               <Link
//                 key={data.id}
//                 to={`/viewMap/${data.id}`}
//                 style={{ margin: "20px", width: "350px", height: "300px" }}
//               >
//                 <div
//                   id={data.id}
//                   style={{
//                     padding: "10px",
//                     backgroundColor: "gray",
//                     color: "white",
//                   }}
//                 >
//                   Polygon Id:{data.id}
//                   <MapContainer
//                     dragging={false}
//                     scrollWheelZoom={false}
//                     center={center}
//                     zoomControl={false}
//                     zoom={zoomLevel}
//                     style={{ height: "250px", width: "100%" }}
//                     ref={mapRef}
//                   >
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Polygon
//                       positions={polygonCoordinates}
//                       pathOptions={{ color: "blue" }}
//                     />
//                   </MapContainer>
//                 </div>
//               </Link>
//             );
//           })
//           : "No Data To Show Right Now"}
//       </div>
//     </div>

export function ServiceAreaInterface(){

  const [serviceArea,setServiceArea]=useState(null)
  const [customers,setCustomer]=useState(null)
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const ZOOM_LEVEL=localStorage.getItem('zoomLevelServiceArea')||12


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

return(
  <>
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
  </>
)
}

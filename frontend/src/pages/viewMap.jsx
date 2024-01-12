import { useState, useEffect, useRef,useCallback } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon,Marker } from 'react-leaflet';
import {Button} from 'react-bootstrap'

export function ViewMap() {
  const navigate=useNavigate()
  const { id } = useParams();
  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [data,setData]=useState([])

    // Function to handle 'beforeunload' event
  const handleBeforeUnload = () => {
    const map = mapRef.current;
    if (map) {
      const zoomLevel = map.getZoom();
      localStorage.setItem("AddzoomLevel", zoomLevel);
    }
  };

  // Add 'beforeunload' event listener when the component mounts
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array to run this effect once when the component mounts

const ZOOM_LEVEL=localStorage.getItem('AddzoomLevel')||12


//delete
  const handleDelete=async()=>{
  const response=await axios.get(`http://localhost:8000/api/map/deletePolygon/${id}/`)
  navigate('/')
  alert(response.data.message)
  }
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/map/getPolygon/${id}/`);
        console.log(response)
        let polygon
        if (response.data.data.polygon){
         polygon = response.data.data.polygon
        }else{
           polygon=response.data.data[0].service_area.polygon
           setData(response.data.data)

        }



        // Convert coordinates to proper format
        const isSRIDIncluded = polygon.startsWith('SRID=4326;');
        // Extract the coordinates string (remove SRID information if present)
        const coordinatesString = isSRIDIncluded ? polygon.substring(20, polygon.length - 2) : polygon;
        // Split the coordinates into individual points
        const points = coordinatesString
          .split(',')
          .map(coord => coord.trim().split(/\s+/).map(c => parseFloat(c)));
        // Swap latitude and longitude for Leaflet
        const polygonCoordinates = points.map(point => [point[1], point[0]]);

        setCoordinates(polygonCoordinates);
          if (polygonCoordinates.length > 0) {
          setCenter({ lat: polygonCoordinates[0][0], lng: polygonCoordinates[0][1] });
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || 'An error occurred while fetching data');
      }
    }
    getData();
  }, [id]);

//for updating map
    useEffect(() => {
    // Manually set the center of the map when the center state changes using useref
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], ZOOM_LEVEL);
    }
  }, [center]);




  return (
    <>
    {coordinates?
    <>
      <MapContainer center={ center } zoom={ZOOM_LEVEL} style={{ height: '500px', width: '100%' }} ref={mapRef}>
     <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

          <Polygon positions={coordinates} pathOptions={{ color: 'blue' }} />
      {data.map((temp) => {
        const location =temp.location
         const coordinatesString =  location.substring(17, location.length - 2) ;
        // Split the coordinates into individual points
        const points = coordinatesString
          .split(',')
          .map(coord => coord.trim().split(/\s+/).map(c => parseFloat(c)));
        // Swap latitude and longitude for Leaflet
        const userCoordinates = points.map(point => [point[1], point[0]]);

        console.log(userCoordinates[0])
    return(
    <Marker key={temp.id} position={userCoordinates[0]}>
    {/* Customize the Marker as needed */}
    </Marker>
      )})}


    </MapContainer>

      <div style={{ backgroundColor: '#242424', paddingTop: '50px', textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={handleDelete}>Delete Data(Polygon)</Button>
        <Button style={{marginLeft:'20px'}}variant="outline-secondary" onClick={()=>{navigate('/')}}>Go Home</Button>
        <Button style={{marginLeft:'20px'}}variant="outline-secondary" onClick={()=>{navigate('/addCustomer')}}>Add Customer</Button>
      </div>

      {data.length>0&&
 <h5 style={{color:'white',paddingBottom:'0px',margin:'0',backgroundColor:'#242424'}}>All Users Within This Area: </h5>}
      <div style={{display:'flex',paddingTop:'20px',backgroundColor:'#242424',marginBottom:'20px',flexWrap:'wrap'}}>

     {data.map((customers)=>{
       const customer=customers.customer
       return(
       <div key={customer.id} style={{backgroundColor:'white',marginLeft:'20px',borderRadius:'10px',padding:'20px',marginTop:'20px',width:'300px'}}>
        <h5>FullName:{customer.first_name} {customer.last_name}</h5>
       <h5>Email:{customer.email}</h5>
       <h5>PhoneNumber:{customer.phone_number}</h5>
       <h5>Country:{customers.country}</h5>
       <h5>State:{customers.state}</h5>
       <h5>City:{customers.city}</h5>
       <h5>Address:{customers.address}</h5>
       <h5>ZipCode:{customers.zip_code}</h5>
       </div>
       )})}
      </div>

      </>


    :"none"}


    </>
  );
}

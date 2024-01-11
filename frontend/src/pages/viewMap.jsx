import { useState, useEffect, useRef,useCallback } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import {Button} from 'react-bootstrap'

export function ViewMap() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState([]);

  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const handleDelete=async()=>{
  const response=await axios.get(`http://localhost:8000/api/deletePolygon/${id}/`)
  navigate('/')
  alert(response.data.message)
  }
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/getPolygon/${id}/`);
        const polygon = response.data.data.polygon;
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


    useEffect(() => {
    // Manually set the center of the map when the center state changes using useref
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], ZOOM_LEVEL);
    }
  }, [center]);




  const ZOOM_LEVEL = 7;
  const mapRef = useRef();
  return (
    <>
    {coordinates?
    <>
      <MapContainer center={ center } zoom={ZOOM_LEVEL} style={{ height: '500px', width: '100%' }} ref={mapRef}>
     <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

          <Polygon positions={coordinates} pathOptions={{ color: 'blue' }} />


    </MapContainer>

      <div style={{ backgroundColor: '#242424', paddingTop: '50px', textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={handleDelete}>Delete Data(Polygon)</Button>
        <Button style={{marginLeft:'20px'}}variant="outline-secondary" onClick={()=>{navigate('/')}}>Go Home</Button>
      </div>
      </>


    :"none"}


    </>
  );
}

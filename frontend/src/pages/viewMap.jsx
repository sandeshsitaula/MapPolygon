import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

export function ViewMap() {
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:8000/api/getPolygon/${id}/`);
        const responseData = response.data.data.points;
        // Convert coordinates to proper format
        const newCoordinates = responseData.map(item => {
          const [longitude, latitude] = item.point
            .match(/-?\d+\.\d+/g)
            .map(coord => parseFloat(coord));
          return [longitude, latitude];
        });

        setCoordinates(newCoordinates);
        setCenter({ lat: newCoordinates[0][0], lng: newCoordinates[0][1] })
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || 'An error occurred while fetching data');
      }
    }
    getData();
  }, [id]);
  useEffect(() => {
    console.log(coordinates)
  })
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [MapLayers, setMapLayers] = useState([])
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  return (
    <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '500px', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {coordinates.length > 0 && (
        <>
          <Polygon positions={coordinates} pathOptions={{ color: 'blue' }} />
        </>
      )}
    </MapContainer>
  );
}

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

export function ViewMap() {
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState([]);

  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
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
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || 'An error occurred while fetching data');
      }
    }
    getData();
  }, [id]);
  useEffect(() => {
    if (coordinates.length > 0) {
      setCenter({ lat: coordinates[0][0], lng: coordinates[0][1] })
    }
  }, [coordinates])

  useEffect(() => {
    console.log(center)
  })
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

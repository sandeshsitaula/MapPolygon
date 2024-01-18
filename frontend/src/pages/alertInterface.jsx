import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import { Button } from "react-bootstrap";
import AxiosInstance from '../axiosInstance'
import {CustomerDetail} from '../components/customerDetail'
/*
export function ViewMap() {

  const navigate = useNavigate();
  const { id } = useParams();
  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [data, setData] = useState([]);
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const handleZoomChanged = () => {
      // Your code to run when the zoom level changes
      const map = mapRef.current;
      if (map) {
        const zoomLevel = map.getZoom();
        localStorage.setItem("AddzoomLevel", zoomLevel);
        localStorage.setItem(`ZoomLevelPolygon${id}`, zoomLevel);
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
  }, [center]); // Include mapRef and polygonId in the dependency array


  const ZOOM_LEVEL = localStorage.getItem(`ZoomLevelPolygon${id}`) || 12;

  //delete

  const handleDelete = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/map/deletePolygon/${id}/`
    );
    navigate("/");
    alert(response.data.message);
  };


  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/map/getPolygon/${id}/`
        );
        let polygon;
        if (response.data.data.polygon) {
          polygon = response.data.data.polygon;
        } else {
          polygon = response.data.data[0].service_area.polygon;
          setData(response.data.data);
        }

        // Convert coordinates to proper format
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

        setCoordinates(polygonCoordinates);
        const averageLat = polygonCoordinates.reduce((sum, coord) => sum + coord[0], 0) / polygonCoordinates.length;
        const averageLng = polygonCoordinates.reduce((sum, coord) => sum + coord[1], 0) / polygonCoordinates.length;
        if (polygonCoordinates.length > 0) {
          setCenter({
            lat: averageLat,
            lng: averageLng,
          });
        }
      } catch (error) {
        console.log(error);
        alert(
          error.response?.data?.error || "An error occurred while fetching data"
        );
      }
    }
    getData();
  }, [id]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await AxiosInstance.get('api/customer/getAllCustomerLocation/')
        setUsers(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  //for updating map
  useEffect(() => {
    // Manually set the center of the map when the center state changes using useref
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], ZOOM_LEVEL);
    }
  }, [center]);

  return (
    <>
      {coordinates ? (
        <>
          <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            style={{ height: "500px", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Polygon positions={coordinates} pathOptions={{ color: "blue" }} />

            {users && users.map((user) => {
              return (
                <Marker key={user[0]} position={user}>
                </Marker>
              )
            })
            }
          </MapContainer>

          <div
            style={{
              backgroundColor: "#242424",
              paddingTop: "50px",
              textAlign: "center",
            }}
          >
            <Button variant="outline-primary" onClick={handleDelete}>
              Delete Data(Polygon)
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              variant="outline-secondary"
              onClick={() => {
                navigate("/");
              }}
            >
              Go Home
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              variant="outline-secondary"
              onClick={() => {
                navigate("/addCustomer");
              }}
            >
              Add Customer
            </Button>
          </div>

            {data.length>0&& <CustomerDetail customers={data} />}

        </>
      ) : (
        "none"
      )}
    </>
  );
}
*/

export function AlertInterface(){
  return(
    <div>hello</div>
  )
}
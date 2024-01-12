import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Icon } from "leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from 'axios'
import { Button,Form } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

export function AddMap() {
   const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [MapLayers, setMapLayers] = useState([])
  const mapRef = useRef();
  const navigate=useNavigate()
const [customers,setCustomers]=useState([])

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
console.log(ZOOM_LEVEL)

//for location searching
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelect = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchValue}`
      );

      const data = await response.json();
      console.log(data)
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCenter({lat:parseFloat(lat),lng: parseFloat(lon)});
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }

  };
    useEffect(() => {
    // Manually set the center of the map when the center state changes using useref
    if (mapRef.current && center) {
      mapRef.current.setView([center.lat, center.lng], ZOOM_LEVEL);
    }
  }, [center]);

//for creating removing and editing handlers
  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [
        ...layers,

        { leaflet_id: _leaflet_id, latlngs: layer._latlngs[0] },
      ]);
    }

  };

  const onEdited = (layers) => {
    //polygons that are changed are stored in changedPolys array
    const changedPolys = Object.values(layers._layers).map((layer) => {
      const latlngs = layer._latlngs[0].map((latlng) => {
        return { lat: latlng.lat, lng: latlng.lng };
      });
      return { leaflet_id: layers._layers._leaflet_id, latlngs: latlngs };
    });

    //update state of all the polygons. replace polygons with changedPolys
    changedPolys.forEach((changedPoly) => {
      setMapLayers((polygons) => {
        return polygons.map((polygon) => {
          if (polygon.leaflet_id === changedPoly.leaflet_id) {
            return { id: changedPoly.leaflet_id, latlngs: changedPoly.latlngs };
          }
          return polygon;
        });
      });
    });
  };



  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.leaflet_id !== _leaflet_id));
    });
  };

  //on adding polygon

  const handleClick = async () => {
    if (MapLayers.length == 0) {
      alert("create atleast one polygon")
      return
    }
    try {
      const response = await axios.post('http://localhost:8000/api/map/addPolygon/',
        MapLayers
      );
      console.log(response)
        if (response.data.data){
        setCustomers(response.data.data)
        }
      alert(response.data.msg)
    } catch (error) {
      console.log(error)
    }
  }

  //
  return (
    <>
      <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: '500px', width: '100%' }} ref={mapRef}>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={(e) => { onEdited(e.layers) }}
            onDeleted={_onDeleted}
            draw={
              {
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}


          />
        </FeatureGroup>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      </MapContainer>


      <div style={{ display:'flex',justifyContent:'space-around' ,backgroundColor: '#242424', paddingTop: '50px', textAlign: 'center' }}>



      <Form>
      <Form.Control value={searchValue} onChange={handleSearchChange} placeholder="Search Location"/>
      </Form>
       <button type="button" onClick={handleSelect}>
        Search
      </button>
        <Button variant="outline-primary" onClick={handleClick}>Save Data(Polygon)</Button>
        <Button style={{marginLeft:'20px'}}variant="outline-secondary" onClick={()=>{navigate('/')}}>Go Home</Button>
      </div>


      {customers.length>0&&<h5 style={{color:'white',paddingBottom:'0px',margin:'0',backgroundColor:'#242424'}}>All Users Within This Area: </h5>}
      <div style={{display:'flex',paddingTop:'20px',backgroundColor:'#242424',marginBottom:'20px',flexWrap:'wrap'}}>

     {customers.map((cust)=>{
        const customer=cust.customer
        console.log(customer)
       return(

       <div key={customer.id} style={{backgroundColor:'white',marginLeft:'20px',borderRadius:'10px',padding:'20px',marginTop:'20px',width:'300px'}}>
       <h5>FullName:{customer.first_name} {customer.last_name}</h5>
       <h5>Email:{customer.email}</h5>
       <h5>PhoneNumber:{customer.phone_number}</h5>
       <h5>Country:{cust.country}</h5>
       <h5>State:{cust.state}</h5>
       <h5>City:{cust.city}</h5>
       <h5>Address:{cust.address}</h5>
       <h5>ZipCode:{cust.zip_code}</h5>
       </div>
       )} )}
      </div>
    </>
  );
}

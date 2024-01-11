import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { Icon } from "leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from 'axios'
import { Button } from 'react-bootstrap'
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
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const navigate=useNavigate()
  const _onCreate = (e) => {
    console.log(e)
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
      console.log(layers._layers)
      console.log(latlngs)
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

  const handleClick = async () => {
    if (MapLayers.length == 0) {
      alert("create atleast one polygon")
      return
    }
    try {
      const response = await axios.post('http://localhost:8000/api/addPolygon/',
        MapLayers
      );
      console.log(response)
      alert(response.data.msg)
    } catch (error) {
      console.log(error)
    }
  }

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

      <div style={{ backgroundColor: '#242424', paddingTop: '50px', textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={handleClick}>Save Data(Polygon)</Button>
        <Button style={{marginLeft:'20px'}}variant="outline-secondary" onClick={()=>{navigate('/')}}>Go Home</Button>
      </div>
    </>
  );
}

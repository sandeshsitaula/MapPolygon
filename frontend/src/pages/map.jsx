import React, {useState,useEffect} from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";import { Icon } from "leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from 'axios'
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
   const [MapLayers,setMapLayers]=useState([])
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

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
   const _onEdited = (e) => {
     console.log(e)
    const {
     layers
    } = e;
    const {_layers}=layers

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      console.log(editing.latlngs[0])
      setMapLayers((layers) =>
        layers.map((l) =>
          l.leaflet_id === _leaflet_id
            ? { ...l, latlngs:  [...editing.latlngs[0][0]] }
            : l
        )
      );
    });
  };
  useEffect(()=>{
    console.log(MapLayers)
  })

  const _onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.leaflet_id !== _leaflet_id));
    });
  };

 const handleClick=async()=>{
   if (MapLayers.length==0){
     alert("create atleast one polygon")
  }
      try{
const response = await axios.post('http://localhost:8000/api/addPolygon/',
MapLayers
);
console.log(response)
alert(response.data.msg)
      }catch(error){
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
                  onEdited={_onEdited}
                  onDeleted={_onDeleted}                  draw={
                    {
                       rectangle: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    }
                  }
                />
              </FeatureGroup>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'      />
    </MapContainer>

    <button onClick={handleClick}>Submit</button>
    </>
  );
}

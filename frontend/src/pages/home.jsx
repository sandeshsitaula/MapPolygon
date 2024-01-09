import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer, Polygon } from "react-leaflet";


function AddNew() {
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/addMap">
                <Button style={{ color: 'white' }} size="lg" variant="outline-primary" >Add New Data</Button>
            </Link>
        </div>
    )
}

function ShowSaved({ savedData }) {

    const parsePolygon = (polygon) => {
        // Check if the polygon format includes SRID information
        const isSRIDIncluded = polygon.startsWith('SRID=4326;');

        // Extract the coordinates string (remove SRID information if present)
        const coordinatesString = isSRIDIncluded ? polygon.substring(20, polygon.length - 2) : polygon;
        // Split the coordinates into individual points
        const points = coordinatesString
            .split(',')
            .map(coord => coord.trim().split(/\s+/).map(c => parseFloat(c)));
        // Swap latitude and longitude for Leaflet

        const polygonCoordinates = points.map(point => [point[1], point[0]]);
        return polygonCoordinates;
    };
    const ZOOM_LEVEL = 15;
    const mapRef = useRef();

    return (
        <div style={{ marginTop: '3rem', textAlign: 'center', color: 'white' }}>
            <h3>Your Saved Data</h3>

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {savedData ?
                    savedData.map((data) => {
                        const polygonCoordinates = parsePolygon(data.polygon);


                        return (
                            <Link key={data.id} to={`/view/${data.id}`} style={{ margin: '20px', width: '350px', height: '300px' }}>
                                <div id={data.id} style={{ padding: '10px', backgroundColor: 'gray', color: 'white' }}>
                                    Polygon Id:{data.id}


                                    <MapContainer center={polygonCoordinates[0]} zoomControl={false} zoom={ZOOM_LEVEL} style={{ height: '250px', width: '100%' }} ref={mapRef}>

                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                        <Polygon positions={polygonCoordinates} pathOptions={{ color: 'blue' }} />

                                    </MapContainer>
                                </div>
                            </Link>

                        )
                    }) : "No Data To Show Right Now"}
            </div>
        </div>
    )
}
export function Home() {
    const [savedData, setSavedData] = useState(null)
    useEffect(() => {
        async function GetData() {
            try {
                const response = await axios.get('http://localhost:8000/api/getAllPolygons/')
                setSavedData(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        GetData()
    }, [])

    return (
        <>
            <div style={{ backgroundColor: '#242424' }}>
                <AddNew />
                <ShowSaved savedData={savedData} />
            </div>
        </>
    )
}

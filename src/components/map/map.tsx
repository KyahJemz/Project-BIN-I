"use client"

import { MapContainer, Marker, Popup, TileLayer, Polyline, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import L, { LatLngExpression } from "leaflet"
import { useState } from "react"

function ClickHandler({ setPosition }: { setPosition: (position: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng; // Get the latitude and longitude from the click event
      setPosition([lat, lng]); // Update the position state with the clicked coordinates
      console.log("Clicked position:", lat, lng); // Optional: Log the clicked coordinates
    },
  });

  return null; // This component does not render anything visible
}

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Example URL, replace with your icon URL
  iconSize: [38, 38], // Size of the icon
  iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38] // Point from which the popup should open relative to the iconAnchor
});


export default function MyMap(props: any) {
  const { position, routeCoordinates } : { position: LatLngExpression | undefined, routeCoordinates: LatLngExpression[] } = props;

  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);

  const defaultPosition: LatLngExpression | undefined  = [51.505, -0.09];
  const defaultZoom: number = 100;

  const isValidPosition = 
    Array.isArray(position) &&
    position.length === 2 &&
    typeof position[0] === 'number' &&
    typeof position[1] === 'number';


  const mapCenter: LatLngExpression | undefined  = isValidPosition ? position : defaultPosition;

  return (
    <MapContainer center={mapCenter} zoom={defaultZoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isValidPosition && (
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
       {routeCoordinates && Array.isArray(routeCoordinates) && (
        <Polyline positions={routeCoordinates} color="blue" weight={5} />
      )}
      {clickedPosition && (
        <Marker position={clickedPosition} icon={customIcon}>
        <Popup>
          You clicked here: <br /> Lat: {clickedPosition[0]}, Lng: {clickedPosition[1]}
        </Popup>
      </Marker>
      )}
      <ClickHandler setPosition={setClickedPosition} />
    </MapContainer>
  );
}

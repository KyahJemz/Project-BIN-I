'use client';

import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Polyline,
	useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L, { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { defaultPosition, defaultZoom, routeColors, routeColorsWeight } from '@/app/constants';

function ClickHandler({
	setPosition,
}: {
	setPosition: (position: [number, number]) => void;
}) {
	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng; // Get the latitude and longitude from the click event
			setPosition([lat, lng]); // Update the position state with the clicked coordinates
			console.log('Clicked position:', lat, lng); // Optional: Log the clicked coordinates
		},
	});

	return null; // This component does not render anything visible
}

const customIcon = L.icon({
	iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Example URL, replace with your icon URL
	iconSize: [38, 38],
	iconAnchor: [19, 38],
	popupAnchor: [0, -38],
});

export default function MyMap(props: any) {
	const {
		positionText,
		position,
		cameraPosition,
		zoom,
		routeCoordinates = [],
		isClickable = false,

	}: {
		positionText?: string;
		position?: LatLngExpression | undefined;
		cameraPosition?: LatLngExpression | undefined;
		zoom?: number;
		routeCoordinates: [LatLngExpression][];
		isClickable?: boolean;
	} = props;

	console.log('routeCoordinates:', routeCoordinates);

	const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);
	return (
		<MapContainer
			center={cameraPosition ?? position ?? defaultPosition}
			zoom={zoom ?? defaultZoom}
			style={{ height: '100%', width: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{position && (
				<Marker position={position ?? defaultPosition}>
					<Popup>{positionText ?? "Cavite City"}</Popup>
				</Marker>
			)}
			{Array.isArray(routeCoordinates) && Array.isArray(routeCoordinates[0]) &&
				routeCoordinates.map((routes, index) => {
				const color = routeColors[index % routeColors.length];
				return (
					<Polyline
						key={index}
						positions={routes}
						color={color}
						weight={routeColorsWeight}
					/>
				);
			})}
			{isClickable && clickedPosition && (
				<Marker position={clickedPosition} icon={customIcon}>
					<Popup>
						You clicked here: <br /> Lat: {clickedPosition[0]}, Lng:{' '}
						{clickedPosition[1]}
					</Popup>
				</Marker>
			)}
			{isClickable && <ClickHandler setPosition={setClickedPosition} />}
		</MapContainer>
	);
}

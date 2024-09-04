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
	setEvent = () => {},
}: {
	setPosition: (position: [number, number]) => void;
	setEvent?: (event: [number, number]) => void;
}) {
	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);
			setEvent([lat, lng]);
		},
	});

	return null;
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
		onClick,

	}: {
		positionText?: string;
		position?: LatLngExpression | undefined;
		cameraPosition?: LatLngExpression | undefined;
		zoom?: number;
		routeCoordinates: [LatLngExpression][];
		isClickable?: boolean;
		onClick?: (coordinates: [number, number]) => void;
	} = props;

	const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);
	return (
		<MapContainer
			center={cameraPosition ?? position ?? defaultPosition}
			zoom={zoom ?? defaultZoom}
			style={{ height: '100%', width: '100%' }}
			className='z-0'
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				zIndex={0}
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
			{isClickable && <ClickHandler setPosition={setClickedPosition} setEvent={onClick}/>}
		</MapContainer>
	);
}

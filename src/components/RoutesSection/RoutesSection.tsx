import { defaultPosition } from "@/app/constants";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

export default function RoutesSection({data}: {data: LatLngExpression[][]}) {
    return (
      <div className="bg-white h-96 p-2 rounded shadow-md z-0">
          <Map 
              zoom={15}
              positionText="Cavite City"
              position={defaultPosition} 
              cameraPosition={defaultPosition}
              routeCoordinates={data}
              isClickable={false}
              className='z-0'
          />
      </div>
    );
}
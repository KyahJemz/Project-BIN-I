import { defaultPosition, routeColors } from "@/app/constants";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import { IScheduleSchedule } from "@/types/IScheduleSchedule";
import { IRoutesDocument } from "@/models/routes";

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

const RoutesTable = ({ routes }:{routes: IRoutesDocument[]}) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Route Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routes.map((route: IRoutesDocument, index: number) => {
                const color = routeColors[index % routeColors.length];
                return(
                    <tr key={index}>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-black`}>
                            {route.routeName}
                        </td>
                        <td className={`px-6 py-4 font-bold whitespace-nowrap text-sm text-${route.status === 'active' ? 'green' : 'red'}-500`}>
                            {route.status}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-${color}-500`}>
                            ▄▄▄▄
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {route.description || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {route.notes || 'N/A'}
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    );
  };

export default function RoutesSection({data}: {data: LatLngExpression[][]}) {
    return (
      <div className="bg-white h-96 p-2 rounded shadow-md">
          <Map 
              zoom={15}
              positionText="Cavite City"
              position={defaultPosition} 
              cameraPosition={defaultPosition}
              routeCoordinates={data}
              isClickable={false}
          />
      </div>
    );
}
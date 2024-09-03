import { defaultPosition, routeColors } from "@/app/constants";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React from "react";
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

export default function RoutesSection({data, routes}: {data: LatLngExpression[][], routes: IRoutesDocument[]}) {
    return (
        <section className="py-10 px-4 bg-white">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2 text-dark-gray">Garbage Collection Routes</h2>
            <p className="text-lg mb-3 text-dark-gray">Check the garbage collection routes in cavite city.</p>

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

        </div>
    </section>
    );
}
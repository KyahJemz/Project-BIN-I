"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IScheduleDocument } from "@/models/schedules";
import dynamic from "next/dynamic";
import { defaultPosition, routeColors } from "@/app/constants";
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

const formatDaysOfMonth = (daysOfMonth?: number[]) => {
    return daysOfMonth?.length ? daysOfMonth.join(', ') : 'N/A';
};

const formatSchedule = (schedule: IScheduleSchedule) => {
    if (schedule.frequency === 'monthly') {
        if (schedule.specificDate) {
            return `On ${schedule.specificDate} at ${schedule.timeStart}`;
        } else if (schedule.daysOfMonth && schedule.daysOfMonth.length > 0) {
            const days = schedule.daysOfMonth.join(', ');
            return `Every ${schedule.interval} month(s) on the ${days} day(s) at ${schedule.timeStart}`;
        }
        return `Every ${schedule.interval} month(s) at ${schedule.timeStart}`;
    } else if (schedule.frequency === 'biweekly') {
        return `Every 2 weeks on ${schedule.dayOfWeek || 'N/A'} at ${schedule.timeStart}`;
    } else if (schedule.frequency === 'weekly') {
        return `Every ${schedule.interval} week(s) on ${schedule.dayOfWeek || 'N/A'} at ${schedule.timeStart}`;
    }
    return `Every ${schedule.interval} week(s) at ${schedule.timeStart}`;
};

export default function IdSchedulesSection({ schedules }: { schedules: IScheduleDocument }) {
    const { scheduleLocation, schedule, status, notes, createdAt, updatedAt, routes } = schedules;
    const router = useRouter();

    const allPoints: number[][] = [];
    const allLat: number[] = [];
    const allLong: number[] = [];

    if (routes) {
        routes.forEach((route) => {
            allPoints.push(route.pickupPoints);
            route.pickupPoints.forEach((point: number[]) => {
                allLat.push(+point[0]); 
                allLong.push(+point[1]); 
            });
        });
    }

    const totalOfLats: number = allLat.reduce((a, b) => a + b, 0);
    const totalOfLongs: number = allLong.reduce((a, b) => a + b, 0);

    const centerOfMarks = (allLat.length > 0 && allLong.length > 0) ? [
        totalOfLats / allLat.length,
        totalOfLongs / allLong.length
    ] : defaultPosition;

    if (!schedules) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl h-auto mx-auto p-4 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mt-4 mb-2">{scheduleLocation}</h1>
            <p className={`text-sm font-bold text-gray-500 mb-2 ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{status} Collection</p>
            <p className="text-sm text-gray-500 mb-2">{formatSchedule(schedule)}</p>
            <p className="text-sm text-gray-500 mb-4">Note: {notes}</p>

            <div className="bg-white h-96 p-2 mb-4 rounded shadow-md">
                <Map 
                    zoom={15}
                    cameraPosition={centerOfMarks} 
                    routeCoordinates={allPoints}
                    isClickable={false}
                />
            </div>

            <div className="bg-white h-auto p-2 mb-4 rounded shadow-md">
                {routes && routes.length > 0 ? <RoutesTable routes={routes} /> : <p>No routes found for this schedule.</p>}
            </div>

            <p className="text-sm text-gray-500 mb-2">Date created: {createdAt.toLocaleDateString()}</p>
            <p className="text-sm text-gray-500 mb-4">Last update: {updatedAt.toLocaleDateString()}</p>
            <button
                onClick={() => router.back()}
                className="bg-sun-yellow text-white px-4 py-2 rounded-md mt-4"
            >
                Go Back
            </button>
        </div>
    );
};
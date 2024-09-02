import { defaultPosition } from "@/app/constants";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";
import { IScheduleSchedule } from "@/types/IScheduleSchedule";

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

const formatDaysOfMonth = (daysOfMonth?: number[]) => {
return daysOfMonth?.length ? daysOfMonth.join(', ') : 'N/A';
};

const formatSchedule = (schedule: IScheduleSchedule) => {
if (schedule.frequency === 'monthly') {
    return schedule.specificDate ? `On ${schedule.specificDate}` : `Every ${schedule.interval} month(s)`;
}
return `Every ${schedule.interval} week(s) on ${schedule.dayOfWeek || 'N/A'}`;
};

export default function RoutesSection({data}: {data: LatLngExpression[][]}) {
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
            <div className="mt-2 flex justify-center">
                <Link href="/routes" className="inline-flex items-center mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded shadow">
                    View Routes Details
                </Link>
        </div>
        </div>
    </section>
    );
}
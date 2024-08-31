import { ICoordinates } from "@/types/ICoordinates.dto";
import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

const routeCoordinates: ICoordinates[] = [
    [14.481390308786406, 120.90879344408413],
    [14.4815609454619, 120.90825703152979],
    [14.481485701942601, 120.90809392249388],
    [14.481386874381286, 120.90620242918128],
    [14.481603059597074, 120.90553897115583],
];


export default function MapSection() {
    return (
        <section className="py-10 px-4 bg-white">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2 text-dark-gray">
                Garbage Collection Schedules
            </h2>
            <p className="text-lg mb-6 text-dark-gray">
                Check the schedule for garbage collection in your area.
            </p>
            <div className="bg-white h-96 p-6 rounded shadow-md">
                <Map
                    position={[14.481390308786406, 120.90879344408413]}
                    routeCoordinates={routeCoordinates}
                />
            </div>
        </div>
    </section>
    );
}
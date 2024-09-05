"use client";

import { defaultPosition } from '@/app/constants';
import {
	useGetRouteByIdHook,
} from '@/hooks/routes.hooks';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

function getCenterPoint(points: number[][]) {
	const allLat: number[] = [];
	const allLong: number[] = [];

	points.forEach((point: number[]) => {
		allLat.push(+point[0]);
		allLong.push(+point[1]);
	});

	const totalOfLats: number = allLat.reduce((a, b) => a + b, 0);
	const totalOfLongs: number = allLong.reduce((a, b) => a + b, 0);

	const centerOfMark = (allLat.length > 0 && allLong.length > 0) ? [
		totalOfLats / allLat.length,
		totalOfLongs / allLong.length
	] : defaultPosition;

	return centerOfMark
}

const IdViewRoute = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [scheduleId, setScheduleId] = useState<string>('');
	const [routeName, setRouteName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const [notes, setNotes] = useState<string>('');
	const [pickupPoints, setPickupPoints] = useState<number[][]>([]);

	const {
		getRouteById,
		isLoading: isGettingRouteById,
		error: isGetRouteByIdError,
		response: getRouteByIdResponse,
	} = useGetRouteByIdHook();

	useEffect(() => {
		const fetch = async () => {
			await getRouteById(params.id);
		};
		fetch();

	}, []);

	useEffect(() => {
		if (getRouteByIdResponse) {
			setScheduleId(getRouteByIdResponse?.schedule_id);
			setRouteName(getRouteByIdResponse?.routeName);
			setDescription(getRouteByIdResponse?.description);
			setStatus(getRouteByIdResponse?.status);
			setNotes(getRouteByIdResponse?.notes);
			setPickupPoints(getRouteByIdResponse?.pickupPoints);
		}
	}, [getRouteByIdResponse]);

	return (
		<>
			{isGettingRouteById && !getRouteByIdResponse ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">Route Details</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						
						<div className="mb-4">
							<p className="text-sm font-bold text-gray-700">Route Location</p>
							<p className="text-gray-800">{scheduleId?.scheduleLocation || '-'}</p>
						</div>
	
						<div className="mb-4">
							<p className="text-sm font-bold text-gray-700">Route Name</p>
							<p className="text-gray-800">{routeName || '-'}</p>
						</div>
	
						<div className="mb-4">
							<p className="text-sm font-bold text-gray-700">Description</p>
							<p className="text-gray-800">{description || '-'}</p>
						</div>
	
						<div className="mb-4">
							<p className="text-sm font-bold text-gray-700">Status</p>
							<p className="text-gray-800">{status === 'active' ? 'Active' : 'Inactive'}</p>
						</div>
	
						<div className="mb-4 col-span-full">
							<p className="text-sm font-bold text-gray-700">Notes</p>
							<p className="text-gray-800">{notes || '-'}</p>
						</div>
					</div>
	
					<div className="mb-6">
						<p className="text-sm font-bold text-gray-700">Route Map</p>
						<div className="bg-gray-100 p-4 rounded-md shadow-sm h-96">
							<Map
								routeCoordinates={[pickupPoints]}
								cameraPosition={getCenterPoint(pickupPoints)}
								className="w-full h-full rounded-md"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
	
	

};

export default IdViewRoute;

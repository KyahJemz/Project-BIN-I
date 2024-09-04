"use client";

import { defaultPosition } from '@/app/constants';
import {
	useGetRouteByIdHook,
	useUpdateRouteHook,
} from '@/hooks/routes.hooks';
import {
	useGetAllSchedulesHook,
} from '@/hooks/schedule.hooks';
import { IScheduleDocument } from '@/models/schedules';
import { IUpdateRoutesRequest } from '@/validation/routes.validation';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

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

const IdEditRoute = ({ params }: { params: { id: string } }) => {
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

	const {
		getAllSchedules,
		isLoading: isGettingAllSchedules,
		error: isGetAllSchedulesError,
		response: getAllSchedulesResponse,
	} = useGetAllSchedulesHook();

	const {
		updateRoute,
		isLoading: isUpdatingRoute,
		error: isUpdateRouteError,
		response: isUpdateRouteResponse,
	} = useUpdateRouteHook();

	useEffect(() => {
		const fetch = async () => {
			await getRouteById(params.id);
			await getAllSchedules();
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

	function onUpdateRoute() {
		const routeData: IUpdateRoutesRequest = {
			schedule_id: scheduleId !== getRouteByIdResponse?.schedule_id ? scheduleId : undefined,
			routeName: routeName !== getRouteByIdResponse?.routeName ? routeName : undefined,
			description: description !== getRouteByIdResponse?.description ? description : undefined,
			status: status !== getRouteByIdResponse?.status ? status : undefined,
			notes: notes !== getRouteByIdResponse?.notes ? notes : undefined,
			pickupPoints: pickupPoints !== getRouteByIdResponse?.pickupPoints ? pickupPoints : undefined,
		};
		updateRoute(params.id, routeData);
	}

	function onPositionClick(position: number[]) {
		if (pickupPoints.length === 0) {
			console.log("New Point Added: ", position);
			setPickupPoints([...pickupPoints, position]);
		} else {
			if (position !== pickupPoints[pickupPoints.length - 1]) {
				console.log("New Point Added: ", position);
				setPickupPoints([...pickupPoints, position]);
			}
		}
	}

	function onPositionsPopped() {
		setPickupPoints((prevPoints) => {
			const updatedPoints = [...prevPoints];
			const removedPoint = updatedPoints.pop();
			console.log("Point Removed: ", removedPoint);
			return updatedPoints;
		})
	}

	function onPositionsCleard() {
		console.log("Removed all points");
		setPickupPoints([]);
	}

	return (
		<>
			{isGettingRouteById && !getRouteByIdResponse ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Route Details</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schedule">
								Select Schedule
							</label>
							<select
								id="schedule"
								value={scheduleId}
								onChange={(e) => setScheduleId(e.target.value)}
								className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<option value="">-</option>
								{getAllSchedulesResponse?.map((schedule: IScheduleDocument) => (
									<option key={schedule._id?.toString()} value={schedule._id?.toString()}>
										{schedule.scheduleLocation}
									</option>
								))}
							</select>
						</div>
	
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="routeName">
								Route Name
							</label>
							<input
								id="routeName"
								type="text"
								placeholder="Enter route name"
								value={routeName}
								onChange={(e) => setRouteName(e.target.value)}
								className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
	
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
								Description
							</label>
							<input
								id="description"
								type="text"
								placeholder="Enter route description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
	
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
								Status
							</label>
							<select
								id="status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
	
						<div className="mb-4 col-span-full">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
								Notes
							</label>
							<input
								id="notes"
								type="text"
								placeholder="Additional notes (optional)"
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
					</div>
	
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">Route Map</label>
						<div className="bg-gray-100 p-4 rounded-md shadow-sm h-96 flex flex-col justify-between">
							<div className="flex space-x-4 mb-4">
								<button
									onClick={onPositionsPopped}
									className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex-1"
								>
									Remove Last Point
								</button>
								<button
									onClick={onPositionsCleard}
									className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex-1"
								>
									Remove All Points
								</button>
							</div>
							<div className="flex-grow">
								<Map
									routeCoordinates={[pickupPoints]}
									isClickable={true}
									onClick={onPositionClick}
									cameraPosition={getCenterPoint(pickupPoints)}
									className="w-full h-full rounded-md"
								/>
							</div>
						</div>
					</div>
	
					<div className="text-center">
						<button
							disabled={isUpdatingRoute}
							onClick={onUpdateRoute}
							className={`w-full md:w-auto px-4 py-2 rounded-md text-white transition ${
								isUpdatingRoute ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
							} focus:outline-none`}
						>
							{isUpdatingRoute ? 'Updating...' : 'Update Route'}
						</button>
					</div>
				</div>
			)}
		</>
	);
	

};

export default IdEditRoute;

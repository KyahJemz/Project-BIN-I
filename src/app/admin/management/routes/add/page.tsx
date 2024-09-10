"use client";

import { defaultPosition } from '@/app/constants';
import {
	useCreateRouteHook,
} from '@/hooks/routes.hooks';
import {
	useGetAllSchedulesHook,
} from '@/hooks/schedule.hooks';
import { IScheduleDocument } from '@/models/schedules';
import { ICreateRoutesRequest } from '@/validation/routes.validation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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

const NewRoute = () => {
	const router = useRouter();

	const [scheduleId, setScheduleId] = useState<string | null>(null);
	const [routeName, setRouteName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [status, setStatus] = useState<string>('active');
	const [notes, setNotes] = useState<string>('');
	const [pickupPoints, setPickupPoints] = useState<number[][]>([]);

	const {
		createRoute,
		isLoading: isCreatingRoute,
		error: isCreateRouteError,
		response: createRouteResponse,
	} = useCreateRouteHook();

	const {
		getAllSchedules,
		isLoading: isGettingAllSchedules,
		error: isGetAllSchedulesError,
		response: getAllSchedulesResponse,
	} = useGetAllSchedulesHook();

	useEffect(() => {
		const fetch = async () => {
			await getAllSchedules();
		};
		fetch();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (createRouteResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [createRouteResponse]);

	function onCreateRoute() {
		const routeData: ICreateRoutesRequest = {
			schedule_id: scheduleId ?? undefined,
			routeName: routeName ?? undefined,
			description: description ?? undefined,
			status: status ?? undefined,
			notes: notes ?? undefined,
			pickupPoints: pickupPoints ?? undefined,
		};
		createRoute(routeData);
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

	function onPositionsCleared() {
		console.log("Removed all points");
		setPickupPoints([]);
	}

	return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6">

				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Route Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schedule">
							Select Schedule
						</label>
						{isGettingAllSchedules && !getAllSchedulesResponse ?
							<p>Loading...</p>
							: (
								<select
									id="schedule"
									value={scheduleId}
									onChange={(e) => setScheduleId(e.target.value)}
									className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">-</option>
									{getAllSchedulesResponse?.map((schedule: IScheduleDocument) => (
										<option key={schedule._id?.toString()} value={schedule._id?.toString()}>
											{schedule.scheduleLocation}
										</option>
									))}
								</select>
							)
						}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="routeName">
							Route Name<a className="text-red-500"> *</a>
						</label>
						<input
							id="routeName"
							type="text"
							placeholder="Enter route name"
							value={routeName}
							onChange={(e) => setRouteName(e.target.value)}
							className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
							className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
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
							className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Route Map
					</label>
					<div className="bg-gray-100 p-2 rounded-md shadow-sm h-96 flex flex-col justify-end">
						<div className="flex-grow">
							<Map
								routeCoordinates={[pickupPoints]}
								isClickable={true}
								onClick={onPositionClick}
								cameraPosition={getCenterPoint(pickupPoints)}
								className="w-full h-full rounded-md"
							/>
						</div>
						<div className="flex justify-end space-x-4 mt-2">
							<button
								onClick={onPositionsPopped}
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
							>
								Remove Last Point
							</button>
							<button
								onClick={onPositionsCleared}
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
							>
								Remove All Points
							</button>
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-4">
					<button
						onClick={() => router.back()}
						className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
						disabled={isCreatingRoute}
					>
						Go Back
					</button>
					<button
						disabled={isCreatingRoute}
						onClick={onCreateRoute}
						className={`font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded`}
					>
						{isCreatingRoute ? 'Creating...' : 'Create Route'}
					</button>
				</div>
			</div>
		</main>
	);
}

export default NewRoute;


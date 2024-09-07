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

const IdEditRoute = ({ params }: { params: { id: string } }) => {
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
		if (isUpdateRouteResponse) {
			router.back();
		}
	}, [isUpdateRouteResponse]);

	useEffect(() => {
		if (getRouteByIdResponse) {
			setScheduleId(getRouteByIdResponse?.schedule_id?._id ?? getRouteByIdResponse?.schedule_id ?? '');
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

	function onPositionsCleared() {
		console.log("Removed all points");
		setPickupPoints([]);
	}

	return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Route Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schedule">
							Select Schedule
						</label>
						{(isGettingAllSchedules || isGettingRouteById) ?
							'Loading...'
							: (
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
							)
						}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="routeName">
							Route Name<a className="text-red-500"> *</a>
						</label>
						{isGettingRouteById ?
							'Loading...'
							: (
								<input
									id="routeName"
									type="text"
									placeholder="Enter route name"
									value={routeName}
									onChange={(e) => setRouteName(e.target.value)}
									className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							)
						}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
							Description
						</label>
						{isGettingRouteById ?
							'Loading...'
							: (
								<input
									id="description"
									type="text"
									placeholder="Enter route description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							)
						}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
							Status<a className="text-red-500"> *</a>
						</label>
						{isGettingRouteById ?
							'Loading...'
							: (
								<select
									id="status"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
									className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</select>
							)
						}
					</div>

					<div className="mb-4 col-span-full">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
							Notes
						</label>
						{isGettingRouteById ?
							'Loading...'
							: (
								<input
									id="notes"
									type="text"
									placeholder="Additional notes (optional)"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							)
						}
					</div>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">Route Map</label>
					<div className="bg-gray-100 p-2 rounded-md shadow-sm h-96 flex flex-col justify-end">
						<div className="flex-grow">
							<Map
								routeCoordinates={[pickupPoints]}
								isClickable={true}
								onClick={onPositionClick}
								cameraPosition={getCenterPoint(pickupPoints)}
							/>
						</div>
						<div className="flex justify-end space-x-4 mt-2">
							<button
								onClick={onPositionsPopped}
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
							>
								Remove Last Point
							</button>
							<button
								onClick={onPositionsCleared}
								className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
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
						disabled={isUpdatingRoute}
					>
						Go Back
					</button>
					<button
						disabled={isUpdatingRoute || isGettingRouteById}
						onClick={onUpdateRoute}
						className={`font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded`}
					>
						{isUpdatingRoute ? 'Updating...' : 'Update Route'}
					</button>
				</div>
			</div>
		</main>
	);


};

export default IdEditRoute;

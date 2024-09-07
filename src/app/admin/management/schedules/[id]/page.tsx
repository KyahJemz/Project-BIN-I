'use client';

import { useGetScheduleByIdHook } from '@/hooks/schedule.hooks';
import { useGetRouteByScheduleIdHook } from '@/hooks/routes.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';
import dynamic from 'next/dynamic';
import BiniTable from '@/components/BiniTable/BiniTable';
import { defaultPosition, routeColors } from '@/app/constants';
import { LatLngLiteral } from 'leaflet';
import { Columns } from 'lucide-react';
import { IRoutesDocument } from '@/models/routes';

const Map = dynamic(
    () => import('@/components/map/map'),
    {
        loading: () => <p>A map is loading</p>,
        ssr: false,
    },
);

const formatSchedule = (schedule: IScheduleSchedule) => {
	if (schedule.frequency === 'monthly') {
		if (schedule.daysOfMonth) {
			return `On ${schedule.daysOfMonth} at ${schedule.timeStart}`;
		} else if (schedule.daysOfMonth && schedule.daysOfMonth?.length > 0) {
			const days = schedule.daysOfMonth?.join(', ');
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

const IdViewSchedule = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [scheduleLocation, setScheduleLocation] = useState<string>('');
	const [schedule, setSchedule] = useState<{
		frequency: string;
		interval: number;
		timeStart: string;
		dayOfWeek?: string | null;
		daysOfMonth?: number[] | null;
	}>({
		frequency: 'weekly',
		interval: 1,
		timeStart: '07:00',
		dayOfWeek: null,
		daysOfMonth: null,
	});
	const [status, setStatus] = useState<string>('active');
	const [notes, setNotes] = useState<string>('');
	const [allPoints, setAllPoints] = useState<number[][]>([]);
	const [routes, setRoutes] = useState<[]>([]);
	const [center, setCenter] = useState<LatLngLiteral>(defaultPosition as LatLngLiteral);
	const [columns, setColumns] = useState<any[]>([]);
	const [rows, setRows] = useState<{}[]>([]);
	const [link, setLink] = useState<string>('');


	const {
		getScheduleById,
		isLoading: isGettingScheduleById,
		error: getScheduleByIdError,
		response: getScheduleByIdResponse
	} = useGetScheduleByIdHook();

	const {
		getRouteByScheduleId,
		isLoading: isGettingRouteByScheduleId,
		error: getRouteByScheduleIdError,
		response: getRouteByScheduleIdResponse
	} = useGetRouteByScheduleIdHook();

	useEffect(() => {
		const fetch = async () => {
			await getScheduleById(params.id);
			await getRouteByScheduleId(params.id);
		};
		fetch();
	}, [params.id]);

	useEffect(() => {
		if (getScheduleByIdResponse) {
			setScheduleLocation(getScheduleByIdResponse?.scheduleLocation);
			setSchedule(getScheduleByIdResponse?.schedule);
			setStatus(getScheduleByIdResponse?.status);
			setNotes(getScheduleByIdResponse?.notes);
		}
	}, [getScheduleByIdResponse]);

	useEffect(() => {
		if (getRouteByScheduleIdResponse) {
			const allPoints: number[][] = [];
			const allLat: number[] = [];
			const allLong: number[] = [];

			if (getRouteByScheduleIdResponse) {
				getRouteByScheduleIdResponse.forEach((route) => {
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

			const columns = [
				'#',
				'Route Name',
				'Status',
				'Color',
				'Description',
				'Notes',
			];
			const rows = getRouteByScheduleIdResponse ? getRouteByScheduleIdResponse.map((route: IRoutesDocument, index: number) => {
				return {
					_id: route._id,
					"#": index + 1,
					'Route Name': route.routeName,
					Status: route.status,
					Color: routeColors[index % routeColors.length],
					Description: route.description,
					Notes: route.notes
				}
				}) : [];
			const link= '/admin/management/routes';

			setCenter(centerOfMarks as LatLngLiteral);
			setAllPoints(allPoints);
			setRoutes(getRouteByScheduleIdResponse);
			setColumns(columns);
			setRows(rows);
			setLink(link);
		}
	}, [getRouteByScheduleIdResponse]);


	return (
		<main>
			<div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6'>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule Full Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Schedule Location:</h3>
						<p className="text-gray-900">{isGettingScheduleById ? 'Loading...' : scheduleLocation}</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Status:</h3>
						<p className={`text-gray-900 ${status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{isGettingScheduleById ? 'Loading...' : status}</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Date and Time</h3>
						<p className="text-gray-900">{isGettingScheduleById ? 'Loading...' : formatSchedule(schedule)}</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Notes:</h3>
						<p className="text-gray-900">{isGettingScheduleById ? 'Loading...' : notes || 'No notes available'}</p>
					</div>
				</div>

				<div className="w-full mt-4">
					<h3 className="text-gray-700 font-semibold font-medium mb-4">Schedule Routes</h3>

				{routes && routes.length === 0 
					? <p className='text-gray-900'>No routes found for this schedule.</p>
					: (
						<>
							<div className="bg-white h-96 p-2 rounded-lg shadow-lg">
								<Map 
									zoom={15}
									cameraPosition={center} 
									routeCoordinates={allPoints}
									isClickable={false}
								/>
							</div>

							<div className="bg-white h-auto p-2 mb-4">
								<BiniTable columns={columns} data={rows} link={link} /> 
							</div>
						</>
					)
				}
				</div>

				<div className="w-full mt-6 flex justify-end">
					<button onClick={() => router.back()} className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded">
						Go Back
					</button>
				</div>
			</div>
		</main>
	);
};

export default IdViewSchedule;

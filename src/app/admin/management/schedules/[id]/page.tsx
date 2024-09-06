'use client';

import { useGetScheduleByIdHook } from '@/hooks/schedule.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';

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

	const { getScheduleById, isLoading: isGettingScheduleById, response: getScheduleByIdResponse } = useGetScheduleByIdHook();

	useEffect(() => {
		const fetch = async () => {
			await getScheduleById(params.id);
		};
		fetch();
	}, []);

	useEffect(() => {
		if (getScheduleByIdResponse) {
			setScheduleLocation(getScheduleByIdResponse?.scheduleLocation);
			setSchedule(getScheduleByIdResponse?.schedule);
			setStatus(getScheduleByIdResponse?.status);
			setNotes(getScheduleByIdResponse?.notes);
		}
	}, [getScheduleByIdResponse]);

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

	return (
		<main>
			{isGettingScheduleById && !getScheduleByIdResponse ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mb-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule Details</h2>
	
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div>
							<h3 className="text-gray-700 font-medium">Schedule Location:</h3>
							<p className="text-gray-900">{scheduleLocation}</p>
						</div>
	
						<div>
							<h3 className="text-gray-700 font-medium">Status:</h3>
							<p className={`text-gray-900 ${status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{status}</p>
						</div>
	
						<div>
							<h3 className="text-gray-700 font-medium">Notes:</h3>
							<p className="text-gray-900">{notes || 'No notes available'}</p>
						</div>
					</div>
	
					<h3 className="text-lg font-semibold text-gray-800 mb-3">Schedule Details</h3>
					<div className="mb-4">
						<p className="text-gray-900">{formatSchedule(schedule)}</p>
					</div>
				</div>
			)}
		</main>
	);
	
	
};

export default IdViewSchedule;

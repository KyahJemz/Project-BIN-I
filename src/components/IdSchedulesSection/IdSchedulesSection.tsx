"use client";

import {
	useGetScheduleByIdHook,
	useUpdateScheduleHook
} from '@/hooks/schedule.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUpdateScheduleRequest } from '@/validation/schedule.validation';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';

type scheduleScheduleProps = {
    frequency: "weekly" | "biweekly" | "monthly";
    interval: number;
    timeStart: string;
    dayOfWeek?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" | null;
    daysOfMonth?: number[] | null;
};

type scheduleProps = {
    scheduleLocation: "weekly" | "biweekly" | "monthly";
    schedule: scheduleScheduleProps;
    status: 'active' | 'inactive';
    notes?: string | null;
};

const IdEditSchedule = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [scheduleLocation, setScheduleLocation] = useState<string>('');
	const [schedule, setSchedule] = useState<scheduleScheduleProps>({
		frequency: 'weekly',
		interval: 1,
		timeStart: '07:00',
        dayOfWeek: null,
		daysOfMonth: null,
	});
	const [status, setStatus] = useState<string>('active');
	const [notes, setNotes] = useState<string>('');

	const {
		getScheduleById,
		isLoading: isGettingScheduleById,
		response: getScheduleByIdResponse,
	} = useGetScheduleByIdHook();

	const {
		updateSchedule,
		isLoading: isUpdatingSchedule,
		response: updateScheduleResponse,
	} = useUpdateScheduleHook();

	useEffect(() => {
		const fetch = async () => {
			await getScheduleById(params.id);
		};
		fetch();
	}, []);

	useEffect(() => {
		if (updateScheduleResponse) {
			router.back();
		}
	}, [updateScheduleResponse]);

	useEffect(() => {
		if (getScheduleByIdResponse) {
			setScheduleLocation(getScheduleByIdResponse?.scheduleLocation);
			setSchedule(getScheduleByIdResponse?.schedule);
			setStatus(getScheduleByIdResponse?.status);
			setNotes(getScheduleByIdResponse?.notes);
		}
	}, [getScheduleByIdResponse]);

	const onUpdateSchedule = () => {
		const scheduleData: scheduleProps = {
			scheduleLocation: scheduleLocation !== getScheduleByIdResponse?.scheduleLocation ? scheduleLocation : undefined,
			schedule: schedule !== getScheduleByIdResponse?.schedule ? schedule : undefined,
			status: status !== getScheduleByIdResponse?.status ? status : undefined,
			notes: notes !== getScheduleByIdResponse?.notes ? notes : undefined,
		};
		updateSchedule(params.id, scheduleData);
	};

	const formatSchedule = (schedule: scheduleScheduleProps) => {
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
		<>
			{isGettingScheduleById && !getScheduleByIdResponse ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Schedule</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="mb-4">
							<label className="block text-gray-700 text-sm mb-2" htmlFor="scheduleLocation">
								Schedule Location
							</label>
							<input
								id="scheduleLocation"
								type="text"
								value={scheduleLocation}
								onChange={(e) => setScheduleLocation(e.target.value)}
								className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>

						{/* Grouped Schedule Fields */}
						<div className="col-span-full">
							<h3 className="text-lg font-semibold mb-4">Schedule Details</h3>

							<div className="mb-4">
								<label className="block text-gray-700 text-sm mb-2" htmlFor="frequency">
									Frequency
								</label>
								<select
									id="frequency"
									value={schedule.frequency ?? ''}
									onChange={(e) => setSchedule((prev) => ({ ...prev, frequency: e.target.value }))}
									className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									<option value="">-</option>
									<option value="weekly">Weekly</option>
									<option value="biweekly">Biweekly</option>
									<option value="monthly">Monthly</option>
								</select>
							</div>

							<div className="mb-4">
								<label className="block text-gray-700 text-sm mb-2" htmlFor="interval">
									Interval (in weeks/months)
								</label>
								<input
									id="interval"
									type="number"
									placeholder="Enter interval"
									value={schedule.interval ?? ''}
									onChange={(e) => setSchedule((prev) => ({ ...prev, interval: Number(e.target.value) }))}
									className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="mb-4">
								<label className="block text-gray-700 text-sm mb-2" htmlFor="dayOfWeek">
									Day of the Week
								</label>
								<select
									id="dayOfWeek"
									value={schedule.dayOfWeek ?? ''}
									onChange={(e) => setSchedule((prev) => ({ ...prev, dayOfWeek: e.target.value }))}
									className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								>
									<option value="">-</option>
									<option value="Monday">Monday</option>
									<option value="Tuesday">Tuesday</option>
									<option value="Wednesday">Wednesday</option>
									<option value="Thursday">Thursday</option>
									<option value="Friday">Friday</option>
									<option value="Saturday">Saturday</option>
									<option value="Sunday">Sunday</option>
								</select>
							</div>

							<div className="mb-4">
								<label className="block text-gray-700 text-sm mb-2" htmlFor="timeStart">
									Time Start
								</label>
								<input
									id="timeStart"
									type="time"
									value={schedule.timeStart ?? ''}
									onChange={(e) => setSchedule((prev) => ({ ...prev, timeStart: e.target.value }))}
									className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="mb-4">
								<label className="block text-gray-700 text-sm mb-2" htmlFor="daysOfMonth">
									Days of the Month (comma-separated)
								</label>
								<input
									id="daysOfMonth"
									type="text"
									placeholder="e.g., 1, 15, 30"
									value={schedule.daysOfMonth?.join(', ') ?? ''}
									onChange={(e) =>
										setSchedule((prev) => ({
											...prev,
											daysOfMonth: e.target.value.split(',').map((day) => parseInt(day.trim())),
										}))
									}
									className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

						</div>
					</div>

					<div className="mb-6">
						<h4 className="text-lg font-semibold text-gray-700">Formatted Schedule:</h4>
						<p className="text-gray-800">{formatSchedule(schedule)}</p>
					</div>

					<div className="text-right">
						<button
							onClick={onUpdateSchedule}
							className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
							disabled={isUpdatingSchedule}
						>
							{isUpdatingSchedule ? 'Updating...' : 'Update Schedule'}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default IdEditSchedule;

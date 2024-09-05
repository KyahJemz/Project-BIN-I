'use client';

import {
	useCreateScheduleHook
} from '@/hooks/schedule.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUpdateScheduleRequest } from '@/validation/schedule.validation';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';
import { create } from 'domain';

type scheduleScheduleProps = {
	frequency: 'weekly' | 'biweekly' | 'monthly';
	interval: number;
	timeStart: string;
	dayOfWeek?:
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday'
	| null;
	daysOfMonth?: number[] | null;
};

type scheduleProps = {
	scheduleLocation: 'weekly' | 'biweekly' | 'monthly';
	schedule: scheduleScheduleProps;
	status: 'active' | 'inactive';
	notes?: string | null;
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

const IdAddSchedule = () => {
	const router = useRouter();

	const [scheduleLocation, setScheduleLocation] = useState<string>('');
	const [schedule, setSchedule] = useState<scheduleScheduleProps>({
		frequency: 'weekly',
		interval: 1,
		timeStart: '07:00',
		dayOfWeek: undefined,
		daysOfMonth: undefined,
	});
	const [daysOfMonthTemp, setDaysOfMonthTemp] = useState<string>('');
	const [status, setStatus] = useState<string>('active');
	const [notes, setNotes] = useState<string>('');

	const {
		createSchedule,
		isLoading: isCreatingSchedule,
		response: createScheduleResponse,
	} = useCreateScheduleHook();

	useEffect(() => {
		if (createScheduleResponse) {
			router.back();
		}
	}, [createScheduleResponse]);

	const onCreateSchedule = () => {
		const scheduleData: IUpdateScheduleRequest = {
			scheduleLocation: scheduleLocation,
			schedule: {
				frequency: schedule?.frequency?.toLowerCase(),
				interval: schedule?.interval,
				timeStart: schedule?.timeStart,
				dayOfWeek: schedule?.dayOfWeek ?? undefined,
				daysOfMonth: schedule?.daysOfMonth ?? undefined,
			},
			status: status,
			notes: notes ?? undefined,
		};
		createSchedule(scheduleData);
	};

	return (

		<div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mb-6">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">
				Create Schedule
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="mb-2">
					<label
						className="block text-gray-700 text-sm mb-2"
						htmlFor="scheduleLocation"
					>
						Schedule Location
					</label>
					<input
						id="scheduleLocation"
						type="text"
						value={scheduleLocation}
						onChange={(e) =>
							setScheduleLocation(e.target.value)
						}
						className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<div className="mb-2">
					<label
						className="block text-gray-700 text-sm mb-2"
						htmlFor="status"
					>
						Status
					</label>
					<select
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
					</select>
				</div>

				<div className="mb-2">
					<label
						className="block text-gray-700 text-sm mb-2"
						htmlFor="notes"
					>
						Notes
					</label>
					<input
						id="notes"
						type="text"
						value={notes}
						onChange={(e) =>
							setNotes(e.target.value)
						}
						className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
				</div>

				<div className="col-span-full">
					<h3 className="text-lg font-semibold mb-4">
						Schedule Details
					</h3>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="frequency"
						>
							Frequency
						</label>
						<select
							id="frequency"
							value={schedule.frequency ?? ''}
							onChange={(e) =>
								setSchedule((prev) => ({ ...prev, frequency: `${e.target.value}` }))
							}
							className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							<option value="">Select Frequency</option>
							<option value="weekly">Weekly</option>
							<option value="biweekly">Biweekly</option>
							<option value="monthly">Monthly</option>
						</select>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="interval"
						>
							Interval (in weeks/months)
						</label>
						<input
							id="interval"
							type="number"
							placeholder="Enter interval"
							value={schedule.interval ?? ''}
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									interval: Number(e.target.value),
								}))
							}
							className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="dayOfWeek"
						>
							Day of the Week
						</label>
						<select
							id="dayOfWeek"
							value={schedule.dayOfWeek ?? ''}
							onChange={(e) =>
								setSchedule((prev) => ({ ...prev, dayOfWeek: e.target.value, }))
							}
							className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							<option value="">Select Day</option>
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
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="timeStart"
						>
							Time Start
						</label>
						<input
							id="timeStart"
							type="time"
							value={schedule.timeStart ?? ''}
							onChange={(e) =>
								setSchedule((prev) => ({
									...prev,
									timeStart: e.target.value,
								}))
							}
							className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="daysOfMonth"
						>
							Days of the Month (comma-separated)
						</label>
						<input
							id="daysOfMonth"
							type="text"
							placeholder="e.g., 1, 15, 30"
							value={
								daysOfMonthTemp ?? ''
							}
							onChange={(e) => {
								setDaysOfMonthTemp(e.target.value);
								const daysArray = e.target.value.split(',');
								console.log(daysArray);
								const numberArray = daysArray.map((day) => Number(day));
								setSchedule((prev) => ({ ...prev, daysOfMonth: numberArray }));
							}}
							className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
					</div>
				</div>
			</div>

			<div className="mb-6">
				<h4 className="text-lg font-semibold text-gray-700">
					Formatted Schedule:
				</h4>
				<p className="text-gray-800">
					{formatSchedule(schedule)}
				</p>
			</div>

			<div className="text-right">
				<button
					onClick={onCreateSchedule}
					className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
					disabled={isCreatingSchedule}
				>
					{isCreatingSchedule
						? 'Creating...'
						: 'Create Schedule'}
				</button>
			</div>
		</div>
	);
};

export default IdAddSchedule;

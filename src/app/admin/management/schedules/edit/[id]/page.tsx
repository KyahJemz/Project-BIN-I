'use client';

import {
	useGetScheduleByIdHook,
	useUpdateScheduleHook,
} from '@/hooks/schedule.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUpdateScheduleRequest } from '@/validation/schedule.validation';

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

const IdEditSchedule = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [scheduleLocation, setScheduleLocation] = useState<string>('');
	const [schedule, setSchedule] = useState<scheduleScheduleProps>({
		frequency: 'weekly',
		interval: 1,
		timeStart: '07:00',
		dayOfWeek: null,
		daysOfMonth: [],
	});
	const [daysOfMonthTemp, setDaysOfMonthTemp] = useState<string>('');
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
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (updateScheduleResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [updateScheduleResponse]);

	useEffect(() => {
		if (getScheduleByIdResponse) {
			setScheduleLocation(getScheduleByIdResponse?.scheduleLocation);
			setSchedule(getScheduleByIdResponse?.schedule);
			setStatus(getScheduleByIdResponse?.status);
			setNotes(getScheduleByIdResponse?.notes);
			setDaysOfMonthTemp(getScheduleByIdResponse?.schedule?.daysOfMonth?.join(',') ?? '');
		}
	}, [getScheduleByIdResponse]);

	const onUpdateSchedule = () => {
		const scheduleData: IUpdateScheduleRequest = {
			scheduleLocation:
				scheduleLocation !== getScheduleByIdResponse?.scheduleLocation
					? scheduleLocation
					: undefined,
			schedule: {
				frequency: schedule?.frequency,
				interval: schedule?.interval,
				timeStart: schedule?.timeStart,
				dayOfWeek: schedule?.dayOfWeek ?? undefined,
				daysOfMonth: daysOfMonthTemp?.split(',').map((day) => Number(day)) ?? undefined,
			},
			status: status !== getScheduleByIdResponse?.status ? status : undefined,
			notes: notes !== getScheduleByIdResponse?.notes ? notes : undefined,
		};
		updateSchedule(params.id, scheduleData);
	};

	return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Edit Schedule Details
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="scheduleLocation"
						>
							Schedule Location<a className="text-red-500"> *</a>
						</label>
						{isGettingScheduleById ?
							'Loading...'
							: (
								<input
									id="scheduleLocation"
									type="text"
									value={scheduleLocation}
									onChange={(e) =>
										setScheduleLocation(e.target.value)
									}
									className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							)
						}

					</div>

					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="status"
						>
							Status<a className="text-red-500"> *</a>
						</label>
						{isGettingScheduleById ?
							'Loading...'
							: (
								<select
							id="status"
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className="block w-full p-2.5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
							)
						}
						
					</div>

					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm mb-2"
							htmlFor="notes"
						>
							Notes
						</label>
						{isGettingScheduleById ? 
							'Loading...'
							: (

						<input
							id="notes"
							type="text"
							value={notes}
							onChange={(e) =>
								setNotes(e.target.value)
							}
							className="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>)
}
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
								Frequency<a className="text-red-500"> *</a>
							</label>
							{isGettingScheduleById ? 
								'Loading...'
								: (
									
								
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
								)
							}
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm mb-2"
								htmlFor="interval"
							>
								Interval (in weeks/months)<a className="text-red-500"> *</a>
							</label>
							{isGettingScheduleById ?
								'Loading...'
								: (
									
						
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
								)
							}
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm mb-2"
								htmlFor="timeStart"
							>
								Time Start<a className="text-red-500"> *</a>
							</label>
							{isGettingScheduleById ?
								'Loading...'
								: (
									
								
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
								)
							}
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm mb-2"
								htmlFor="dayOfWeek"
							>
								Day of the Week
							</label>
							{isGettingScheduleById ?
								'Loading...'
								: (
									
								
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
								)
							}
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm mb-2"
								htmlFor="daysOfMonth"
							>
								Days of the Month (comma-separated)
							</label>
							{isGettingScheduleById ?
								'Loading...'
								: (
									
								
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
								)
							}
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h4 className="text-lg font-semibold text-gray-700">
						Formatted Schedule:
					</h4>
					{isGettingScheduleById ?
						'Loading...'
						: (
					<p className="text-gray-800">
						{formatSchedule(schedule)}
					</p>
						)
					}
				</div>

				<div className="flex justify-end gap-4">
				<button 
						onClick={() => router.back()} 
						className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
						disabled={isUpdatingSchedule}
					>
						Go Back
					</button>
					<button
						onClick={onUpdateSchedule}
						className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
						disabled={isGettingScheduleById ||isUpdatingSchedule}
					>
						{isUpdatingSchedule
							? 'Updating...'
							: 'Update Schedule'}
					</button>
				</div>
			</div>
		</main>
	);
};

export default IdEditSchedule;

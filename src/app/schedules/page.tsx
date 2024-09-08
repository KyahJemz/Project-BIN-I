"use client";

import BiniTable from '@/components/BiniTable/BiniTable';
import React, { useEffect } from 'react';
import {
    useGetAllSchedulesHook,
} from '@/hooks/schedule.hooks';
import { IScheduleDocument } from '@/models/schedules';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';

const formatSchedule = (schedule: IScheduleSchedule) => {
    if (schedule.frequency === 'monthly') {
        if (schedule.specificDate) {
            return `On ${schedule.specificDate} at ${schedule.timeStart}`;
        } else if (schedule.daysOfMonth && schedule.daysOfMonth.length > 0) {
            const days = schedule.daysOfMonth.join(', ');
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

const Schedules = () => {

	const {
		getAllSchedules,
		isLoading: isGettingAllSchedules,
		error: getAllSchedulesError,
		response: getAllSchedulesResponse,
	} = useGetAllSchedulesHook();

	useEffect(() => {
        const fetchData = async () => {
            await getAllSchedules();
        };
        fetchData();
    }, []);

	const link = '/schedules/';
	const columns = [
		'#',
		'Location',
		'Schedule',
		'Time Start',
		'Notes'
	]
    const rows = getAllSchedulesResponse ? (getAllSchedulesResponse??[]).slice().reverse().map((schedule: IScheduleDocument, index: number) => {
        return {
            _id: schedule._id,
			'#': index + 1,
            Location: schedule.scheduleLocation,
            Schedule: formatSchedule(schedule.schedule),
            'Time Start': schedule.schedule.timeStart,
            Notes: schedule.notes,
        }
        }) : [];

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Collection Dates: Garbage collection Schedules</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Find out when garbage will be collected in your area.</p>
				{isGettingAllSchedules 
					? <p>Loading...</p> 
					: <BiniTable header='All Waste Collection Schedules' columns={columns} data={rows} link={link} client={true} />
				}
			</div>
		</main>
	)
}	

export default Schedules;
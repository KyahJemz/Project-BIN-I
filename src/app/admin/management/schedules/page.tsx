"use client";

import BiniTable from '@/components/BiniTable/BiniTable';
import React, { useEffect, useState } from 'react';
import {
    useGetAllSchedulesHook,
	useDeleteScheduleHook
} from '@/hooks/schedule.hooks';
import { IScheduleDocument } from '@/models/schedules';
import { IScheduleSchedule } from '@/types/IScheduleSchedule';
import { useRouter } from 'next/navigation';

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

const ScheduleManagement = () => {
	const router = useRouter();
	
	const [refresh, setRefresh] = useState(false);

	const {
		getAllSchedules,
		isLoading: isGettingAllSchedules,
		error: getAllSchedulesError,
		response: getAllSchedulesResponse,
	} = useGetAllSchedulesHook();

	const {
		deleteSchedule,
		isLoading: isDeletingSchedules,
		error: deleteSchedulesError,
		response: deleteSchedulesResponse,
	} = useDeleteScheduleHook();

	useEffect(() => {
        const fetchData = async () => {
            await getAllSchedules();
			setRefresh(false);
        };
        fetchData();
    }, [refresh]);

	useEffect(() => {
        setRefresh(true);
    }, [deleteSchedulesResponse]);

	const link = '/admin/management/schedules'
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
    
	function onAdd () {
		router.push('/admin/management/schedules/add');
	}
	
    function onEdit (id: string) {
		router.push('/admin/management/schedules/edit/' + id);
	}
    function onDelete (id: string) {
		if (!isDeletingSchedules) {
			deleteSchedule(id);
		}
	}

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white'>
				{isGettingAllSchedules 
					? <p>Loading...</p> 
					: <BiniTable header='Schedules Overview' columns={columns} data={rows} link={link} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
				}
			</div>
		</main>
	)
}	

export default ScheduleManagement;
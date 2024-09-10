"use client";
import { IScheduleDocument } from "@/models/schedules";
import { IScheduleSchedule } from "@/types/IScheduleSchedule";
import Link from "next/link";
import React from "react";

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

const SchedulesTable = ({ schedules }: { schedules: IScheduleDocument[] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Location
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Schedule
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Time Start
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Notes
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.map((schedule: IScheduleDocument, index: number) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {schedule.scheduleLocation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatSchedule(schedule.schedule)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {schedule.schedule.timeStart}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {schedule.notes || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link href={`/routes/${schedule._id.toString()}`}  className="text-indigo-600 hover:text-indigo-900">
                                    View Routes
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default function SchedulesSection({ data, }: { data: IScheduleDocument[] }) {
    return (
        <div className="bg-white h-auto p-2 rounded shadow-md container mx-auto">
            <SchedulesTable schedules={data}/>
        </div>
    );
}
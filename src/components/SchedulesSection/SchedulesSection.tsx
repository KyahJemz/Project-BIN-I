import { IScheduleDocument } from "@/models/schedules";
import { IScheduleSchedule } from "@/types/IScheduleSchedule";
import Link from "next/link";
import React from "react";

const formatDaysOfMonth = (daysOfMonth?: number[]) => {
  return daysOfMonth?.length ? daysOfMonth.join(', ') : 'N/A';
};

const formatSchedule = (schedule: IScheduleSchedule) => {
  if (schedule.frequency === 'monthly') {
    return schedule.specificDate ? `On ${schedule.specificDate}` : `Every ${schedule.interval} month(s)`;
  }
  return `Every ${schedule.interval} week(s) on ${schedule.dayOfWeek || 'N/A'}`;
};

const SchedulesTable = ({ schedules }:{schedules: IScheduleDocument[]}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Schedule
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Time Start
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Days of Month
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              View
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
                {formatDaysOfMonth(schedule.schedule.daysOfMonth)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {schedule.notes || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href={`/routes/${schedule._id.toString()}`} className="text-indigo-600 hover:text-indigo-900">
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

export default function SchedulesSection({ data }: { data: IScheduleDocument[] }) {
  return (
    <section className="bg-light-gray py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-dark-gray">Garbage Collection Schedules</h2>
        <p className="text-lg mb-6 text-dark-gray">Check the schedule for garbage collection in your area.</p>
        <div className="bg-white h-auto p-2 rounded shadow-md">
          <SchedulesTable schedules={data} />
        </div>
        <div className="mt-2 flex justify-center">
          <Link href="/schedules" className="inline-flex items-center mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded shadow">
            View All Schedules
          </Link>
        </div>
      </div>
    </section>
  );
}
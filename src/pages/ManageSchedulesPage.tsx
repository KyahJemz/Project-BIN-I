import React from "react";
import SchedulesSection from "@/components/SchedulesSection/SchedulesSection";
import SchedulesModel, { IScheduleDocument } from "@/models/schedules";
import { ScheduleService } from "@/services/schedule.service";

export interface SchedulesPageProps {
	allSchedules: IScheduleDocument[];
}

export const getSchedulesPageProps = async () => {
	const schedulesService = new ScheduleService(SchedulesModel);

    try {
        const [allSchedules] = await Promise.all([
			schedulesService.getAllSchedules(),
        ]);

        return {
            props: {
				allSchedules,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
				allSchedules: [],
            },
        };
    } 
};

const ManageSchedulesPage = ({schedules} : { schedules: IScheduleDocument[]}) => {
    

    return (
    <div>

        <SchedulesSection data={schedules}/>

    </div>
);
}

export default ManageSchedulesPage;
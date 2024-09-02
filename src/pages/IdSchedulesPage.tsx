import IdSchedulesSection from "@/components/IdSchedulesSection/IdSchedulesSection";
import SchedulesModel, { IScheduleDocument } from "@/models/schedules";
import { ScheduleService } from "@/services/schedule.service";

export interface SchedulesPageProps {
    idSchedules: IScheduleDocument | null; 
}

export const getIdSchedulesPageProps = async (id: string) => {
    const schedulesService = new ScheduleService(SchedulesModel);
    try {
        const idSchedules = await schedulesService.getScheduleById(id)
        return { props: { idSchedules }};
    } catch (error) {
        console.error(error);
        return { props: { idSchedules: null }}} 
};

export default function IdSchedulesPage({
	idSchedules,
}: SchedulesPageProps) {

	return (
		<div className="min-h-screen bg-gray-100">

            {/* Schedules Section */}
            <IdSchedulesSection schedules={idSchedules}/>

        </div>
	);
}
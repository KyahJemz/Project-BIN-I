import { ScheduleService } from '@/services/schedule.service';
import SchedulesModel, { IScheduleDocument } from '@/models/schedules';
import SchedulesSection from '@/components/SchedulesSection/SchedulesSection';

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

export default function SchedulePage({
	allSchedules,
}: SchedulesPageProps) {

	return (
		<div className="min-h-screen">

            {/* Garbage Collection Schedules Section */}
            <SchedulesSection data={allSchedules.reverse()} />

        </div>
	);
}
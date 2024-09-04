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
		<div className="min-h-screen bg-gray-100">
            <section className="bg-light-gray py-10 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-2 text-dark-gray">Garbage Collection Schedules</h2>
                    <p className="text-lg mb-6 text-dark-gray">Check the schedule for garbage collection in your area.</p>
                    <SchedulesSection data={allSchedules.reverse()} />
                </div>
            </section>
        </div>
	);
}
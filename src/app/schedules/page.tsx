import SchedulePage, { getSchedulesPageProps } from "@/pages/SchedulesPage";

export default async function Schedules() {
	const { props } = await getSchedulesPageProps();
	return (
		<>
			<SchedulePage allSchedules={props.allSchedules}/>
		</>
	);
}

import IdSchedulesPage, { getIdSchedulesPageProps } from "@/pages/IdSchedulesPage";

export default async function ScheduleId({ params }: { params: { id: string } }) {
	const id = params.id;
	const { props } = await getIdSchedulesPageProps(id);
	return (
		<>
			<IdSchedulesPage idSchedules={props.idSchedules} />
		</>
	);
}

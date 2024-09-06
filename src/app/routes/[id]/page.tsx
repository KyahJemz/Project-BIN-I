import IdSchedulesPage, { getIdSchedulesPageProps } from "@/pages/IdSchedulesPage";

export default async function ScheduleId({ params }: { params: { id: string } }) {
	const id = params.id;
	const { props } = await getIdSchedulesPageProps(id);
	return (
		<main>
			<IdSchedulesPage idSchedules={props.idSchedules} />
		</main>
	);
}

export default async function ScheduleId({ params }: { params: { id: string } }) {
	const id = params.id;
	return (
		<>
			{id}
		</>
	);
}

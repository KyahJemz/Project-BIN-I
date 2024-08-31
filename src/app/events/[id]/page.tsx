export default async function EventId({ params }: { params: { id: string } }) {
	const id = params.id;
	return (
		<>
			{id}
		</>
	);
}

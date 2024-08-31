export default async function RouteId({ params }: { params: { id: string } }) {
	const id = params.id;
	return (
		<>
			{id}
		</>
	);
}

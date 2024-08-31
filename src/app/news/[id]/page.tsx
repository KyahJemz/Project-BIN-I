export default async function NewsId({ params }: { params: { id: string } }) {
	const id = params.id;
	return (
		<>
			{id}
		</>
	);
}

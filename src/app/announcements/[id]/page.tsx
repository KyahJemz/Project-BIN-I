export default async function AnnouncementId({ params }: { params: { id: string } }) {
	const id = params.id;
	return (
		<>
			{id}
		</>
	);
}

import IdEventsPage, { getIdEventPageProps } from "@/pages/IdEventsPage";

export default async function EventId({ params }: { params: { id: string } }) {
	const id = params.id;
	const { props } = await getIdEventPageProps(id);
	return (
		<main>
			<IdEventsPage idEvent={props.idEvents} />
		</main>
	);
}

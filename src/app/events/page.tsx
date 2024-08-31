import EventsPage, { getEventsPageProps } from "@/pages/EventsPage";

export default async function Events() {
	const { props } = await getEventsPageProps();
	return (
		<>
			<EventsPage allEvents={props.allEvents}/>
		</>
	);
}

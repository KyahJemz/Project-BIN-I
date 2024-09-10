import EventsModel, { IEventDocument } from '@/models/events';
import { EventService } from '@/services/events.service';
import IdEventsSection from '@/components/IdEventsSection/IdEventsSection';

export interface EventsPageProps {
    idEvent: IEventDocument | null; 
}

export const getIdEventPageProps = async (id: string) => {
    const eventsService = new EventService(EventsModel, null);
    try {
        const idEvents = await eventsService.getEventById(id)
        return { props: { idEvents }};
    } catch (error) {
        console.error(error);
        return { props: { idEvents: null }}} 
};

export default function IdEventsPage() {

	return (
		<></>
	);
}
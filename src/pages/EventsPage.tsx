import EventsModel, { IEventDocument } from '@/models/events';
import { EventService } from '@/services/events.service';
import EventsSection from '@/components/EventsSection/EventsSection';

export interface EventsPageProps {     
    allEvents: IEventDocument[];         
}

export const getEventsPageProps = async () => {
    const eventsService = new EventService(EventsModel);

    try {
        const [allEvents] = await Promise.all([
            eventsService.getAllEvent(),
        ]);

        return {
            props: {
                allEvents,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                allEvents: [],
            },
        };
    } 
};

export default function EventsPage({
    allEvents,
}: EventsPageProps) {
	return (
		<div className="min-h-screen bg-gray-100">

            {/* Upcoming Events Section */}
            <EventsSection data={allEvents.reverse()}/>

        </div>
	);
}
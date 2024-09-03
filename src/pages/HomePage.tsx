import { AnnouncementService } from '@/services/announcements.service';
import AnnouncementsModel, { IAnnouncementDocument } from '@/models/announcements';
import { NewsService } from '@/services/news.service';
import NewsModel, { INewsDocument } from '@/models/news';
import EventsModel, { IEventDocument } from '@/models/events';
import { EventService } from '@/services/events.service';
import { ContactDetailsService } from '@/services/contactDetails.service';
import ContactDetailsModel, { IContactDetailsDocument } from '@/models/contactDetails';
import { RoutesService } from '@/services/routes.service';
import { ScheduleService } from '@/services/schedule.service';
import SchedulesModel, { IScheduleDocument } from '@/models/schedules';
import RoutesModel, { IRoutesDocument } from '@/models/routes';
import RoutesSection from '@/components/RoutesSection/RoutesSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import EventsSection from '@/components/EventsSection/EventsSection';
import AnnouncementsSection from '@/components/AnnouncementsSection/AnnouncementsSection';
import HeroSection from '@/components/HeroSection/HeroSection';
import SchedulesSection from '@/components/SchedulesSection/SchedulesSection';
import { LatLngExpression } from 'leaflet';
import Routes from '@/app/routes/page';
import Link from 'next/link';

export interface HomePageProps {
    allAnnouncements: IAnnouncementDocument[]; 
    allNews: INewsDocument[];           
    allEvents: IEventDocument[];         
    allContactDetails: IContactDetailsDocument[]; 
	allSchedules: IScheduleDocument[];
	allRoutes: IRoutesDocument[];
}

export const getHomePageProps = async () => {
    const announcementService = new AnnouncementService(AnnouncementsModel);
    const newsService = new NewsService(NewsModel);
    const eventsService = new EventService(EventsModel);
    const contactDetailsService = new ContactDetailsService(ContactDetailsModel);
	const schedulesService = new ScheduleService(SchedulesModel);
	const routesService = new RoutesService(RoutesModel);

    try {
        const [allAnnouncements, allNews, allEvents, allContactDetails, allSchedules, allRoutes] = await Promise.all([
            announcementService.getAllAnnouncements(),
            newsService.getAllNews(),
            eventsService.getAllEvent(),
            contactDetailsService.getAllContactDetails(),
			schedulesService.getAllSchedules(),
			routesService.getAllRoutes(),
        ]);

        return {
            props: {
                allAnnouncements,
                allNews,
                allEvents,
                allContactDetails,
				allSchedules,
				allRoutes
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                allAnnouncements: [],
                allNews: [],
                allEvents: [],
                allContactDetails: [],
				allSchedules: [],
				allRoutes: []
            },
        };
    } 
};

export default function HomePage({
	allAnnouncements,
    allNews,
    allEvents,
    allContactDetails,
	allSchedules,
	allRoutes
}: HomePageProps) {

    function getRandomItems(array: IScheduleDocument[], count: number) {
        const shuffled = array.slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function getAllRoutes(array: IRoutesDocument[] = []) {
        const routes: LatLngExpression[] = [];
        array.forEach((route) => {
            routes.push(route.pickupPoints as unknown as LatLngExpression);
        })
        return routes;
    }

    const last5Announcements = allAnnouncements.slice(-6).reverse();
    const last5Events = allEvents.slice(-3).reverse();
    const last5News = allNews.slice(-4).reverse();
    const random5Schedules = getRandomItems(allSchedules, 5);
    const allRoutesGathered = getAllRoutes(allRoutes);

	return (
		<div className="min-h-screen bg-gray-100">

            {/* Hero Section */}
            <HeroSection />

            {/* Upcoming Events Section */}
            <EventsSection data={last5Events}/>

            {/* News Highlights Section */}
            <NewsSection data={last5News} />

            {/* Announcements Section */}
            <AnnouncementsSection data={last5Announcements}/>

            {/* Garbage Collection Schedules Section */}
            <SchedulesSection data={random5Schedules} />

            {/* Routes Section */}
            <section className="py-10 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-2 text-dark-gray">Garbage Collection Routes</h2>
                    <p className="text-lg mb-3 text-dark-gray">Check the garbage collection routes in cavite city.</p>
                    <RoutesSection data={allRoutesGathered as unknown as LatLngExpression[][]}  />
                    <div className="mt-2 flex justify-center">
                        <Link href="/routes" className="inline-flex items-center mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded shadow">
                            View Routes Details
                        </Link>
                    </div>
                </div>
            </section>

        </div>
	);
}
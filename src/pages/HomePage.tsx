import dynamic from 'next/dynamic';
import Header from '@/components/Header/Header';
import { ICoordinates } from '@/types/ICoordinates.dto';
import { AnnouncementService } from '@/services/announcements.service';
import AnnouncementsModel, { IAnnouncementDocument } from '@/models/announcements';
import { NewsService } from '@/services/news.service';
import NewsModel, { INewsDocument } from '@/models/news';
import EventsModel, { IEventDocument } from '@/models/events';
import { EventService } from '@/services/events.service';
import { ContactDetailsService } from '@/services/contactDetails.service';
import ContactDetailsModel, { IContactDetailsDocument } from '@/models/contactDetails';
import { IContactDetail } from '@/types/IContactDetail.dto';
import { RoutesService } from '@/services/routes.service';
import { ScheduleService } from '@/services/schedule.service';
import SchedulesModel, { IScheduleDocument } from '@/models/schedules';
import RoutesModel, { IRoutesDocument } from '@/models/routes';
import Link from 'next/link';

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

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

	// Define the route coordinates
	const routeCoordinates: ICoordinates[] = [
		[14.481390308786406, 120.90879344408413],
		[14.4815609454619, 120.90825703152979],
		[14.481485701942601, 120.90809392249388],
		[14.481386874381286, 120.90620242918128],
		[14.481603059597074, 120.90553897115583],
	];

	const headerMoreItems = [
		{ name: 'Events', description: 'Explore upcoming events and activities.', href: '/events', icon: '' },
		{ name: 'News', description: 'Stay updated with the latest news and updates.', href: '/news', icon: '' },
		{ name: 'Announcements', description: 'View important announcements and updates here.', href: '/announcements', icon: '' },
		{ name: 'Schedules', description: 'Check the schedule for garbage collection in your area', href: '/schedules', icon: '' },
		{ name: 'Routes', description: 'View and track waste collection routes and timings', href: '/routes', icon: '' },
		{ name: 'Contact', description: 'Get in touch for inquiries and support.', href: '/about', icon: '' },
	]

	const headerItems = [
		{ name: 'Home', href: '/', items: null},
		{ name: 'About', href: '/about', items: null },
		{ name: 'News', href: '/news', items: null },
		{ name: 'Announcements', href: '/announcements', items: null },
		{ name: 'More',  href: null, items: headerMoreItems  },
	]

	const headerButton = {
		name: 'Login',
		href: '/admin'
	}

	const headerTitle = {
		name: 'BIN-I Portal',
		href: '/',
		image: "",
	}

	console.log(allAnnouncements, allNews, allEvents, allContactDetails, allSchedules, allRoutes);

	return (
		<div className="min-h-screen">

    {/* Header */}
    {/* <Header headerItems={headerItems} headerTitle={headerTitle} headerButton={headerButton}/> */}

    {/* Hero Section */}
    <section className="bg-sky-blue text-dark-gray py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
            BIN-I: Keep Cavite City Clean and Green
        </h2>
        <p className="text-lg mb-6">
            Stay informed, participate, and make a difference in our community.
        </p>
        <div>
            <Link href={'/news'} className="bg-sun-yellow text-dark-gray px-6 py-2 rounded mr-4">
                Read News
            </Link>
            <Link href={'/events'} className="bg-sun-yellow text-dark-gray px-6 py-2 rounded">
                See Events
            </Link>
        </div>
    </section>

    {/* Announcements Section */}
    <section className="py-20 px-4 bg-light-gray">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
                Latest Announcements
            </h2>
            <p className="text-lg mb-4 text-dark-gray">
                Stay up-to-date with the latest news and updates.
            </p>
            <ul className="space-y-4">
                <li className="bg-white p-4 rounded shadow">
                    <h3 className="font-bold text-dark-gray">Announcement Title</h3>
                    <p className="text-dark-gray">
                        A brief description of the announcement.
                    </p>
                </li>
                {/* More announcements */}
            </ul>
        </div>
    </section>

    {/* Upcoming Events Section */}
    <section className="bg-olive-green py-20 px-4">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
                Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white text-dark-gray p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-2">
                        Event Name
                    </h3>
                    <p>
                        Details about the event.
                    </p>
                    <button className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded">
                        Details
                    </button>
                </div>
                {/* More event cards */}
            </div>
        </div>
    </section>

    {/* News Highlights Section */}
    <section className="py-20 px-4 bg-light-gray">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
                Recent News Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-2 text-dark-gray">
                    News Post Title
                    </h3>
                    <p className="text-dark-gray">
                        A short excerpt from the news post...
                    </p>
                    <button className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded">
                        Read More
                    </button>
                </div>
                {/* More news posts */}
            </div>
        </div>
    </section>

    {/* Garbage Collection Schedules Section */}
    <section className="py-20 px-4">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-dark-gray">
                Garbage Collection Schedules
            </h2>
            <p className="text-lg mb-6 text-dark-gray">
                Check the schedule for garbage collection in your area.
            </p>
            <div className="bg-white h-96 p-6 rounded shadow-md">
                <Map
                    position={[14.481390308786406, 120.90879344408413]}
                    routeCoordinates={routeCoordinates}
                />
            </div>
        </div>
    </section>

    {/* Routes Section */}
    <section className="bg-light-gray py-20 px-4">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-dark-gray">
                Collection Routes
            </h2>
            <div className="bg-white p-6 rounded shadow-md">
                [Map or List of Routes Here]
            </div>
        </div>
    </section>
</div>
	);
}
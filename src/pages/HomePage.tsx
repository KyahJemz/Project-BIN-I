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
import Link from 'next/link';
import PostsModel, { IPostDocument } from '@/models/posts';
import { PostService } from '@/services/posts.service';

export interface HomePageProps {
    allAnnouncements: IAnnouncementDocument[]; 
    allNews: INewsDocument[];           
    allEvents: IEventDocument[];         
    allContactDetails: IContactDetailsDocument[]; 
	allSchedules: IScheduleDocument[];
	allRoutes: IRoutesDocument[];
    allPosts: IPostDocument[];
}

export const getHomePageProps = async () => {
    const announcementService = new AnnouncementService(AnnouncementsModel, null);
    const newsService = new NewsService(NewsModel, null);
    const eventsService = new EventService(EventsModel, null);
    const contactDetailsService = new ContactDetailsService(ContactDetailsModel);
	const schedulesService = new ScheduleService(SchedulesModel, null);
	const routesService = new RoutesService(RoutesModel, null);
    const postsService = new PostService(PostsModel, null);

    try {
        const [allAnnouncements, allNews, allEvents, allContactDetails, allSchedules, allRoutes, allPosts] = await Promise.all([
            announcementService.getAllAnnouncements(),
            newsService.getAllNews(),
            eventsService.getAllEvent(),
            contactDetailsService.getAllContactDetails(),
			schedulesService.getAllSchedules(),
			routesService.getAllRoutes(),
            postsService.getAllPosts(),
        ]);

        return {
            props: {
                allAnnouncements,
                allNews,
                allEvents,
                allContactDetails,
				allSchedules,
				allRoutes,
                allPosts
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
				allRoutes: [],
                allPosts: []
            },
        };
    } 
};

export default function HomePage({

}) {

	return (
		<></>
	);
}
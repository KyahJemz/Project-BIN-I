import React from "react";
import Image from 'next/image'
import Link from "next/link";
import NewsDisplayGrid from "@/components/NewsDisplayGrid/NewsDisplayGrid";
import BiniGrid from "@/components/BiniGrid/BiniGrid";
import AnnouncementsModel, { IAnnouncementDocument } from "@/models/announcements";
import EventsModel, { IEventDocument } from "@/models/events";
import NewsModel, { INewsDocument } from "@/models/news";
import PostsModel, { IPostDocument } from "@/models/posts";
import RoutesModel, { IRoutesDocument } from "@/models/routes";
import SchedulesModel, { IScheduleDocument } from "@/models/schedules";
import { AnnouncementService } from "@/services/announcements.service";
import { EventService } from "@/services/events.service";
import { NewsService } from "@/services/news.service";
import { PostService } from "@/services/posts.service";
import { RoutesService } from "@/services/routes.service";
import { ScheduleService } from "@/services/schedule.service";
import dynamic from "next/dynamic";
import { defaultPosition } from "./constants";
import { IScheduleSchedule } from "@/types/IScheduleSchedule";

const Map = dynamic(
	() => import('@/components/map/map'),
	{
		loading: () => <p>A map is loading</p>,
		ssr: false,
	},
);

const BiniTable = dynamic(
	() => import('@/components/BiniTable/BiniTable'),
	{
		loading: () => <p>A table is loading</p>,
		ssr: false,
	},
);

export const routeColors = [
	'green',
	'blue',
	'red',
	'purple',
	'orange',
	'yellow',
	'pink',
	'black',
]

export interface HomePageProps {
	allAnnouncements: IAnnouncementDocument[];
	allNews: INewsDocument[];
	allEvents: IEventDocument[];
	allSchedules: IScheduleDocument[];
	allRoutes: IRoutesDocument[];
	allPosts: IPostDocument[];
}

export const getHomePageProps = async () => {
	const announcementService = new AnnouncementService(AnnouncementsModel, null);
	const newsService = new NewsService(NewsModel, null);
	const eventsService = new EventService(EventsModel, null);
	const schedulesService = new ScheduleService(SchedulesModel, null);
	const routesService = new RoutesService(RoutesModel, null);
	const postsService = new PostService(PostsModel, null);

	try {
		const [allAnnouncements, allNews, allEvents, allSchedules, allRoutes, allPosts] = await Promise.all([
			announcementService.getAllAnnouncements(),
			newsService.getAllNews(),
			eventsService.getAllEvent(),
			schedulesService.getAllSchedules(),
			routesService.getAllRoutes(),
			postsService.getAllPosts(),
		]);

		return {
			props: {
				allAnnouncements,
				allNews,
				allEvents,
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
				allSchedules: [],
				allRoutes: [],
				allPosts: []
			},
		};
	}
};

const HeroSection = () => {
	return (
		<section className="bg-white text-dark-gray py-20 px-4">
			<div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center">

				<div className="flex-1 mb-8 md:mb-0 md:ml-8 hidden md:block h-96">
					<div className="relative w-full h-full">
						<Image
							src="/images/tree.png"
							alt="Cavite City"
							layout="fill"
							objectFit="contain"
							className="rounded-lg"
						/>
					</div>
				</div>

				<div className="flex-1 text-center md:text-left">
					<h2 className="text-3xl md:text-5xl font-bold mb-4">BIN-I: Keep Cavite City Clean and Green</h2>
					<p className="text-base md:text-lg mb-6">Stay informed, participate, and make a difference in our community.</p>
					<div className="flex flex-col sm:flex-row justify-center md:justify-start items-center">
						<Link href={'/news'} className="bg-sun-yellow shadow-md text-dark-gray px-6 py-2 rounded mb-4 sm:mb-0 sm:mr-4">Read News</Link>
						<Link href={'/events'} className="bg-sun-yellow shadow-md text-dark-gray px-6 py-2 rounded">See Events</Link>
					</div>
				</div>

			</div>
		</section>
	)
}

const NewsSection = ({ props }: any) => {
	return (<NewsDisplayGrid data={props?.allNews.slice(0, 7)} />)
}

const AnnouncementsSection = ({ props }: any) => {
	return (<BiniGrid data={props.allAnnouncements.slice(0, 4)} link={"/announcements"} type={"announcement"} grid="grid-cols-1 sm:grid-cols-1 lg:grid-cols-2" />)
}

const EventsSection = ({ props }: any) => {
	return (<BiniGrid data={props.allEvents.slice(0, 3)} link={"/events"} type={"event"} grid="grid-cols-1 sm:grid-cols-1 lg:grid-cols-1" />)
}

const PostsSection = ({ props }: any) => {
	return (<BiniGrid data={props.allPosts.slice(0, 4)} link={"/posts"} type={"post"} grid="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />)
}

const RoutesSection = ({ props }: any) => {
	const allPoints: number[][] = [];
	const allLat: number[] = [];
	const allLong: number[] = [];

	if (props.allRoutes) {
		props.allRoutes.slice(0, 5).forEach((route) => {
			allPoints.push(route.pickupPoints);
			route.pickupPoints.forEach((point: number[]) => {
				allLat.push(+point[0]);
				allLong.push(+point[1]);
			});
		});
	}

	const totalOfLats: number = allLat.reduce((a, b) => a + b, 0);
	const totalOfLongs: number = allLong.reduce((a, b) => a + b, 0);

	const centerOfMarks = (allLat.length > 0 && allLong.length > 0) ? [
		totalOfLats / allLat.length,
		totalOfLongs / allLong.length
	] : defaultPosition;

	const columns = [
		'#',
		'Route Name',
		'Status',
		'Color',
		'Description',
		'Notes',
	];

	const rows = props.allRoutes ? props.allRoutes.map((route: IRoutesDocument, index: number) => {
		return {
			_id: route._id,
			"#": index + 1,
			'Route Name': route.routeName,
			Status: route.status,
			Color: routeColors[index % routeColors.length],
			Description: route.description,
			Notes: route.notes
		}
	}) : [];
	const link = '/routes/';

	return (
		<>
			<div className="bg-white h-96 p-2 rounded-lg shadow-lg mb-6">
				<Map
					zoom={15}
					cameraPosition={centerOfMarks}
					routeCoordinates={allPoints}
					isClickable={false}
				/>
			</div>
			<BiniTable
				header=''
				columns={columns}
				data={rows}
				link={link}
			/>
		</>
	)
}

const SchedulesSection = ({ props }: any) => {
	const formatSchedule = (schedule: IScheduleSchedule) => {
		if (schedule.frequency === 'monthly') {
			if (schedule.specificDate) {
				return `On ${schedule.specificDate} at ${schedule.timeStart}`;
			} else if (schedule.daysOfMonth && schedule.daysOfMonth.length > 0) {
				const days = schedule.daysOfMonth.join(', ');
				return `Every ${schedule.interval} month(s) on the ${days} day(s) at ${schedule.timeStart}`;
			}
			return `Every ${schedule.interval} month(s) at ${schedule.timeStart}`;
		} else if (schedule.frequency === 'biweekly') {
			return `Every 2 weeks on ${schedule.dayOfWeek || 'N/A'} at ${schedule.timeStart}`;
		} else if (schedule.frequency === 'weekly') {
			return `Every ${schedule.interval} week(s) on ${schedule.dayOfWeek || 'N/A'} at ${schedule.timeStart}`;
		}
		return `Every ${schedule.interval} week(s) at ${schedule.timeStart}`;
	};


	const link = '/schedules/';
	const columns = [
		'#',
		'Location',
		'Schedule',
		'Time Start',
		'Notes'
	]
	const rows = props.allSchedules ? (props.allSchedules ?? []).slice(0, 5).map((schedule: IScheduleDocument, index: number) => {
		return {
			_id: schedule._id,
			'#': index + 1,
			Location: schedule.scheduleLocation,
			Schedule: formatSchedule(schedule.schedule),
			'Time Start': schedule.schedule.timeStart,
			Notes: schedule.notes,
		}
	}) : [];
	return (
		<>
			<BiniTable header='' columns={columns} data={rows} link={link} />
		</>
	)
}

const AboutSection = ({ props }: any) => {
	return (
		<>
			<section className="my-6 px-10 text-center">
				<h3 className="text-lg font-semibold mb-1 text-dark-gray">Mission</h3>
				<p className="text-md text-dark-gray">
					Our mission is to inform and guide the community on proper waste management and environmental sustainability.
					We provide clear, timely information on waste segregation, disposal, and recycling, alongside tools like
					collection schedules and routes. Our goal is to help residents adopt responsible waste practices for a cleaner and greener Cavite City.
				</p>
			</section>

			<section className="my-6 px-10 text-center">
				<h3 className="text-lg font-semibold mb-1 text-dark-gray">Vision</h3>
				<p className="text-md text-dark-gray">
					Our vision is to be the go-to resource for waste management in Cavite City. We aim to connect residents with
					the information they need to make sustainable choices, while promoting collaboration between the community and
					local authorities. Through this, we strive to create a cleaner, greener city.
				</p>
			</section>
		</>
	);
};

export default async function Home() {
	const { props } = await getHomePageProps();
	return (
		<main>
			<div className="min-h-screen bg-gray-100 max-w-7xl mx-auto">
				<HeroSection />

				<section className="bg-white text-dark-gray py-6 px-4">
					<h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Stay in the Know: Latest News</h2>
					<p className="text-lg mb-4 text-dark-gray">Your source for the latest headlines and breaking stories.</p>
					<NewsSection props={props} />
					<Link href={"/news"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">View all news</Link>
				</section>

				<section className="bg-white text-dark-gray py-6 px-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-4">
					<section className="bg-white text-dark-gray px-4 col-span-2">
						<h2 className="text-xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Don’t Miss Out: Announcements</h2>
						<p className="text-md mb-4 text-dark-gray">Stay ahead with important updates and official notices.</p>
						<AnnouncementsSection props={props} />
						<Link href={"/announcements"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">View all announcements</Link>
					</section>

					<section className="bg-white text-dark-gray px-4">
						<h2 className="text-xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Save the Date: Upcoming Events</h2>
						<p className="text-md mb-4 text-dark-gray">Don’t miss out—discover events happening near you.</p>
						<EventsSection props={props} />
						<Link href={"/events"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">View all events</Link>
					</section>
				</section>

				<section className="bg-white text-dark-gray py-6 px-4">
					<h2 className="text-xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Fresh Insights: Latest Posts</h2>
					<p className="text-md mb-4 text-dark-gray">Explore fresh perspectives, opinions, and in-depth articles.</p>
					<PostsSection props={props} />
					<Link href={"/posts"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">View all posts</Link>
				</section>

				<section className="bg-white text-dark-gray py-6 border-t-2 border-green-800 px-4">
					<h2 className="text-xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Collection Routes: Garbage Pickup Routes</h2>
					<p className="text-md mb-4 text-dark-gray">View the routes and locations for garbage collection in your neighborhood.</p>
					<RoutesSection props={props} />
					<Link href={"/routes"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">View all routes</Link>
				</section>

				<section className="bg-white text-dark-gray py-6 border-t-2 border-green-800 px-4">
					<h2 className="text-xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Collection Dates: Garbage Collection Schedules</h2>
					<p className="text-md mb-4 text-dark-gray">Find out when garbage will be collected in your area.</p>
					<SchedulesSection props={props} />
					<Link href={"/schedules"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">View all schedules</Link>
				</section>

				<section className="bg-white text-dark-gray py-6 border-t-2 border-green-800 px-4">
					<h2 className="text-xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Behind the Scenes: About Us</h2>
					<p className="text-md mb-4 text-dark-gray">Get to know the purpose behind our mission.</p>
					<AboutSection props={props} />
					<Link href={"/about"} className="text-forest-green font-medium hover:underline block mt-4 mx-2 border-2 w-max border-green-800 px-4 py-2">Learn more about us</Link>
				</section>

			</div>
		</main>

	)
}

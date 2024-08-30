import HomePage, {getHomePageProps} from "@/pages/HomePage";

export default async function Home() {
	const { props } = await getHomePageProps();
	return (
		<HomePage allAnnouncements={props.allAnnouncements} allNews={props.allNews} allEvents={props.allEvents} allContactDetails={props.allContactDetails} allSchedules={props.allSchedules} allRoutes={props.allRoutes}/> 
	)
}

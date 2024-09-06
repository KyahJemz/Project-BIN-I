import AnnouncementsPage, { getAnnouncementPageProps } from "@/pages/AnnouncementsPage";

export default async function Announcements() {
	const { props } = await getAnnouncementPageProps();
	return (
		<main>
			<AnnouncementsPage allAnnouncements={props.allAnnouncements}/>
		</main>
	);
}

import IdAnnouncementsPage, { getIdAnnouncementPageProps } from "@/pages/IdAnnouncementsPage";

export default async function AnnouncementId({ params }: { params: { id: string } }) {
	const id = params.id;
	const { props } = await getIdAnnouncementPageProps(id);
	return (
		<>
			<IdAnnouncementsPage idAnnouncements={props.idAnnouncements} />
		</>
	);
}
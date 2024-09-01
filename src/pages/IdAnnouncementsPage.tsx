import { AnnouncementService } from '@/services/announcements.service';
import AnnouncementsModel, { IAnnouncementDocument } from '@/models/announcements';
import IdAnnouncementsSection from '@/components/IdAnnouncementsSection/IdAnnouncementsSection';

export interface AnnouncementsPageProps {
    idAnnouncements: IAnnouncementDocument | null; 
}

export const getIdAnnouncementPageProps = async (id: string) => {
    const announcementService = new AnnouncementService(AnnouncementsModel);
    try {
        const idAnnouncements = await announcementService.getAnnouncementById(id)
        return { props: { idAnnouncements }};
    } catch (error) {
        console.error(error);
        return { props: { idAnnouncements: null }}} 
};

export default function IdAnnouncementsPage({
	idAnnouncements,
}: AnnouncementsPageProps) {

	return (
		<div className="min-h-screen">

            {/* Announcements Section */}
            <IdAnnouncementsSection data={idAnnouncements}/>

        </div>
	);
}
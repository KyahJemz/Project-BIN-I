import { AnnouncementService } from '@/services/announcements.service';
import AnnouncementsModel, { IAnnouncementDocument } from '@/models/announcements';
import AnnouncementsSection from '@/components/AnnouncementsSection/AnnouncementsSection';
export interface AnnouncementsPageProps {
    allAnnouncements: IAnnouncementDocument[]; 
}

export const getAnnouncementPageProps = async () => {
    const announcementService = new AnnouncementService(AnnouncementsModel, null);

    try {
        const [allAnnouncements] = await Promise.all([
            announcementService.getAllAnnouncements(),
        ]);

        return {
            props: {
                allAnnouncements,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                allAnnouncements: [],
            },
        };
    } 
};

export default function AnnouncementsPage({
}) {

	return (
		<></>
	);
}
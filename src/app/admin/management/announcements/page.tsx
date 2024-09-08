"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllAnnouncementsHook,
    useDeleteAnnouncementHook,
} from '@/hooks/announcements.hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const AnnouncementsManagement = () => {
    const router = useRouter();

	const [refresh, setRefresh] = useState(false);

    const {
        getAllAnnouncements,
        isLoading: isGettingAllAnnouncements,
        error: getAllAnnouncementsError,
        response: getAllsAnnouncementResponse,
    } = useGetAllAnnouncementsHook();

    const {
        deleteAnnouncement,
        isLoading: isDeletingAnnouncement,
        error: deleteAnnouncementError,
        response: deleteAnnouncementResponse,
    } = useDeleteAnnouncementHook();

    useEffect(() => {
        const fetchData = async () => {
            await getAllAnnouncements();
			setRefresh(false);
        };
        fetchData();
    }, [refresh]);

	useEffect(() => {
        setRefresh(true);
    }, [deleteAnnouncementResponse]);

    function onAddAnnouncement() {
        router.push('/admin/management/announcements/add');
    }

    function onEditAnnouncement(id: string) {
        router.push(`/admin/management/announcements/edit/${id}`);
    }

    function onDeleteAnnouncement(id: string) {
        if(!isDeletingAnnouncement) {
			deleteAnnouncement(id);
		}
    }

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
				<BiniGrid data={getAllsAnnouncementResponse ?? []} header='Announcements Overview' type='announcement' link={'/announcements/'} onAdd={onAddAnnouncement} onDelete={onDeleteAnnouncement} onEdit={onEditAnnouncement}/>
			</div>
		</main>
    );
}

export default AnnouncementsManagement;
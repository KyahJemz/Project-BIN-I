"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllAnnouncementsHook,
} from '@/hooks/announcements.hooks';
import React, { useEffect } from "react";

const Announcements = () => {
    const {
        getAllAnnouncements,
        isLoading: isGettingAllAnnouncements,
        error: getAllAnnouncementsError,
        response: getAllsAnnouncementResponse,
    } = useGetAllAnnouncementsHook();

    useEffect(() => {
        const fetchData = async () => {
            await getAllAnnouncements();
        };
        fetchData();
    }, []);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white'>
				<BiniGrid data={getAllsAnnouncementResponse ?? []} header='Bin-I Announcements Page' type='announcement' link={'/announcements/'}/>
			</div>
		</main>
    );
}

export default Announcements;
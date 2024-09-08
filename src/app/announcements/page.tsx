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
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white  max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Don’t Miss Out: Announcements</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Stay ahead with important updates and official notices.</p>
				<BiniGrid data={getAllsAnnouncementResponse ?? []} header='Bin-I Announcements Page' type='announcement' link={'/announcements/'}/>
			</div>
		</main>
    );
}

export default Announcements;
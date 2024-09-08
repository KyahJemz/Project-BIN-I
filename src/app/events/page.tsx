"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllEventsHook,
} from '@/hooks/events.hooks';
import React, { useEffect } from "react";

const Events = () => {
    const {
        getAllEvents,
        isLoading: isGettingAllEvents,
        error: getAllEventsError,
        response: getAllsEventResponse,
    } = useGetAllEventsHook();

    useEffect(() => {
        const fetchData = async () => {
           await getAllEvents();
        };
        fetchData();
    }, []);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white  max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Save the Date: Upcoming Events</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Don’t miss out—discover events happening near you.</p>
				<BiniGrid data={getAllsEventResponse ?? []} header='Bin-I Events Page' type='event' link={'/events/'}/>
			</div>
		</main>
    );
}

export default Events;
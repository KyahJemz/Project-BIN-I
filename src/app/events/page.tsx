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
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white'>
				<BiniGrid data={getAllsEventResponse ?? []} header='Bin-I Events Page' type='event' link={'/events/'}/>
			</div>
		</main>
    );
}

export default Events;
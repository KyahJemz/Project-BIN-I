"use client";

import BiniGrid from '@/components/BiniGrid/BiniGrid';
import {
    useGetAllEventsHook,
    useDeleteEventHook,
} from '@/hooks/events.hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const EventsManagement = () => {
    const router = useRouter();

	const [refresh, setRefresh] = useState(false);

    const {
        getAllEvents,
        isLoading: isGettingAllEvents,
        error: getAllEventsError,
        response: getAllsEventResponse,
    } = useGetAllEventsHook();

    const {
        deleteEvent,
        isLoading: isDeletingEvent,
        error: deleteEventError,
        response: deleteEventResponse,
    } = useDeleteEventHook();

    useEffect(() => {
        const fetchData = async () => {
            await getAllEvents();
			setRefresh(false);
        };
        fetchData();
        // eslint-disable-next-line
    }, [refresh]);

	useEffect(() => {
        setRefresh(true);
    }, [deleteEventResponse]);

    function onAddEvent() {
        router.push('/admin/management/events/add');
    }

    function onEditEvent(id: string) {
        router.push(`/admin/management/events/edit/${id}`);
    }

    function onDeleteEvent(id: string) {
        if(!isDeletingEvent) {
			deleteEvent(id);
		}
    }

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
				<BiniGrid data={getAllsEventResponse ?? []} header='Events Overview' type='event' link={'/events/'} onAdd={onAddEvent} onDelete={onDeleteEvent} onEdit={onEditEvent}/>
			</div>
		</main>
    );
}

export default EventsManagement;
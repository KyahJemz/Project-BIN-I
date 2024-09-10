import { IEventDocument } from "@/models/events";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const EventCard = ({details}: {details: IEventDocument}) => {
    return (
        <div className="bg-white text-dark-gray p-6 rounded shadow-md">
            <div className="relative w-full h-48 mb-4">
                <Image 
                    src={`/images/events/${details.image}`} 
                    alt={details.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded"
                />
            </div>
            <h3 className="text-xl font-bold mb-2">{details.title}</h3>
            <p>{details.description}</p>
            <Link href={`/events/${details._id}`} ><button className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 shadow-md rounded">Details</button></Link>
        </div>
    )
}

const NoEventCard = () => {
    return (
        <div className="bg-white text-dark-gray p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">No Events</h3>
            <p>There are no upcoming events at the moment. Please check back later for updates.</p>
            <button disabled className="mt-4 bg-sun-yellow text-dark-gray px-4 py-2 rounded opacity-0"></button>
        </div>
    )
}

export default function EventsSection({data}: {data: IEventDocument[]}) {
    return (
        <section className="bg-olive-green py-10 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-2 text-dark-gray">Upcoming Events</h2>
                <p className="text-lg mb-8 text-dark-gray">Find out about our upcoming events and activities.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.length > 0 ? (
                        data.map((event: IEventDocument, ) => (
                            <EventCard key={event._id} details={event} />      
                        ))
                    ) : (
                        <NoEventCard />
                    )}
                </div>
            </div>
        </section>
    );
}

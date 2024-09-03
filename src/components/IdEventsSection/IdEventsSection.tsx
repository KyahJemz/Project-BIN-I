"use client";

import React from "react";
import Image from 'next/image';
import PreviewRenderer from "../EditorJsRenderer/PreviewRenderer";
import { useRouter } from "next/navigation";
import { IEventDocument } from "@/models/events";

export default function IdEventsSection({ event }: { event: IEventDocument }) {
    const { title, author, content, description, image, eventTime, eventDate, status, createdAt } = event;
    const router = useRouter();

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl h-auto mx-auto p-4 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mt-4 mb-2">{title}</h1>
            <p className="text-sm text-gray-500 mb-2">By {author}</p>
            <p className="text-sm text-gray-500 mb-4">Published on {new Date(createdAt).toLocaleDateString()}</p>
            
            {/* Display Event Date and Time */}
            <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700">
                    Event Date: <span className="text-gray-600">{new Date(eventDate).toLocaleDateString()}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700">
                    Event Time: <span className="text-gray-600">{eventTime}</span>
                </p>
            </div>

            <p className="text-lg mb-4">{description}</p>

            {image && (
                <div className="mb-4">
                    <Image
                        src={`/images/events/${image}`}
                        alt={title}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-md object-cover"
                    />
                </div>
            )}

            {/* Render the parsed content using your parser */}
            <PreviewRenderer data={JSON.parse(content).blocks} />

            <button
                onClick={() => router.back()}
                className="bg-sun-yellow text-white px-4 py-2 rounded-md mt-4"
            >
                Go Back
            </button>
        </div>
    );
};
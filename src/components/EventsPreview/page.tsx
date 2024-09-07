"use client";

import React from "react";
import Image from 'next/image';
import PreviewRenderer from "@/components/EditorJsRenderer/PreviewRenderer";
import { formatFullDate } from "@/utils/utilities";
import { IEventDocument } from "@/models/events";

export default function EventsPreview({ events }: { events: IEventDocument }) {
    const { title, author, description, uploadedImage, image, createdAt } = news;

    return (
        <>
            <h1 className="text-4xl font-bold mt-4 mb-2">{title}</h1>
            <p className="text-sm text-gray-500 mb-2">By {author}</p>
            <p className="text-sm text-gray-500 mb-4">Published on {formatFullDate(new Date(createdAt))}</p>
            <p className="text-lg mb-4">{description}</p>
            {image && (
                <div className="mb-4">
                    <Image
                        key={"image"}
                        width={400}
                        height={400}
                        src={uploadedImage ? image : `/images/news/${image}`}
                        alt="Current preview"
                        className="w-full object-cover rounded-md border border-gray-300"
                    />
                </div>
            )}
            <PreviewRenderer data={null} />
        </>
    );
};

"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import PreviewRenderer from "@/components/EditorJsRenderer/PreviewRenderer";
import { useRouter } from "next/navigation";
import { useGetEventByIdHook } from "@/hooks/events.hooks";
import { useEditorStore } from "@/stores/useEditorStore";
import { formatDate, formatFullDate } from "@/utils/utilities";

export default function EventId({ params }: { params: { id: string } }) {
    const router = useRouter();

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>("N/A");
	const [author, setAuthor] = useState<string>("N/A");
	const [description, setDescription] = useState<string>("N/A");
	const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());
	const [updatedAt, setUpdatedAt] = useState<string>(new Date().toISOString().toString());
	const [image, setImage] = useState<string>("");
	const [content, setContent] = useState<[]>([]);
	const [eventLocation, setEventLocation] = useState<string>("N/A");
	const [eventDate, setEventDate] = useState<string>(new Date().toISOString().toString());
	const [eventTime, setEventTime] = useState<string>("N/A");

	const {
		getEventById,
		isLoading: isGettingEventById,
		error: getEventByIdError,
		response: getEventByIdResponse,
	} = useGetEventByIdHook();

	useEffect(() => {
		const fetchData = async () => {
			await getEventById(params.id);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (getEventByIdResponse) {
			setEditorData(JSON.parse(getEventByIdResponse?.content ?? "[]") ?? content);
			setTitle(getEventByIdResponse?.title ?? title);
			setAuthor(getEventByIdResponse?.author ?? author);
			setDescription(getEventByIdResponse?.description ?? description);
			setCreatedAt(getEventByIdResponse?.createdAt ?? createdAt);
			setUpdatedAt(getEventByIdResponse?.updatedAt ?? updatedAt);
			setImage(getEventByIdResponse?.image ?? image);
			setContent(JSON.parse(getEventByIdResponse?.content ?? "[]")?.blocks ?? content);
			setEventLocation(getEventByIdResponse?.eventLocation ?? eventLocation);
			setEventDate(getEventByIdResponse?.eventDate ?? eventDate);
			setEventTime(getEventByIdResponse?.eventTime ?? eventTime);
		}
	}, [getEventByIdResponse]);

    return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">{isGettingEventById ? 'Loading...' : title}</h1>
				<p className="text-sm text-gray-500 mb-2">{isGettingEventById ? 'Loading...' : `By ${author}`}</p>
				<p className="text-sm text-gray-500 mb-4 border-b border-gray-500 pb-4">
					{isGettingEventById
						? 'Loading...'
						: `Published ${formatFullDate(createdAt)} | Updated ${formatFullDate(updatedAt)}`}
				</p>

				<p className="text-lg text-gray-900 mb-4">{isGettingEventById ? 'Loading...' : description}</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Event Location:</h3>
						<p className="text-gray-900">{isGettingEventById ? 'Loading...' : eventLocation}</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Event Date:</h3>
						<p className="text-gray-900">
							{isGettingEventById ? 'Loading...' : formatDate(eventDate)}
						</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Event Time:</h3>
						<p className="text-gray-900">{isGettingEventById ? 'Loading...' : eventTime}</p>
					</div>
				</div>

				{isGettingEventById ? (
					<p className="text-gray-500">Loading image...</p>
				) : image && (
					<div className="mb-4">
						<Image
							src={`/images/events/${image}`}
							alt={title}
							width={600}
							height={400}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
				)}

				<div className="bg-white h-auto p-2 mb-4">
					{isGettingEventById ? <p className="text-gray-500">Loading preview...</p> : <PreviewRenderer data={content} />}
				</div>

				<div className="w-full mt-6 flex justify-end">
					<button onClick={() => router.back()} className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded">
						Go Back
					</button>
				</div>
			</div>
		</main>
	);
};

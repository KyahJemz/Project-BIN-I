"use client";

import React, { useEffect } from "react";
import Image from 'next/image';
import PreviewRenderer from "@/components/EditorJsRenderer/PreviewRenderer";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/stores/useEditorStore";
import { useGetNewsByIdHook } from "@/hooks/news.hooks";
import { formatDate, formatFullDate } from "@/utils/utilities";

export default function NewsId({ params }: { params: { id: string } }) {
	const router = useRouter();

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = React.useState<string>("N/A");
	const [author, setAuthor] = React.useState<string>("N/A");
	const [description, setDescription] = React.useState<string>("N/A");
	const [createdAt, setCreatedAt] = React.useState<string>(new Date().toISOString().toString());
	const [image, setImage] = React.useState<string>("");
	const [content, setContent] = React.useState<[]>([]);
	const [eventLocation, setEventLocation] = React.useState<string>("N/A");
	const [eventDate, setEventDate] = React.useState<string>(new Date().toISOString().toString());
	const [eventTime, setEventTime] = React.useState<string>("N/A");

	const {
		getNewsById,
		isLoading: isGettingNewsById,
		error: getNewsByIdError,
		response: getNewsByIdResponse,
	} = useGetNewsByIdHook();

	useEffect(() => {
		const fetchData = async () => {
			await getNewsById(params.id);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (getNewsByIdResponse) {
			setEditorData(JSON.parse(getNewsByIdResponse?.content ?? "[]") ?? content);
			setTitle(getNewsByIdResponse?.title ?? title);
			setAuthor(getNewsByIdResponse?.author ?? author);
			setDescription(getNewsByIdResponse?.description ?? description);
			setCreatedAt(getNewsByIdResponse?.createdAt ?? createdAt);
			setImage(getNewsByIdResponse?.image ?? image);
			setContent(JSON.parse(getNewsByIdResponse?.content ?? "[]")?.blocks ?? content);
			setEventLocation(getNewsByIdResponse?.eventLocation ?? eventLocation);
			setEventDate(getNewsByIdResponse?.eventDate ?? eventDate);
			setEventTime(getNewsByIdResponse?.eventTime ?? eventTime);
		}
	}, [getNewsByIdResponse]);

	return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">{isGettingNewsById ? 'Loading...' : title}</h1>
				<p className="text-sm text-gray-500 mb-2">{isGettingNewsById ? 'Loading...' : `By ${author}`}</p>
				<p className="text-sm text-gray-500 mb-4">
					{isGettingNewsById
						? 'Loading...'
						: `Published on ${formatFullDate(createdAt)}`}
				</p>

				<p className="text-lg text-gray-900 mb-4">{isGettingNewsById ? 'Loading...' : description}</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Event Location:</h3>
						<p className="text-gray-900">{isGettingNewsById ? 'Loading...' : eventLocation}</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Event Date:</h3>
						<p className="text-gray-900">
							{isGettingNewsById ? 'Loading...' : formatDate(eventDate)}
						</p>
					</div>
					<div>
						<h3 className="text-gray-700 font-semibold font-medium">Event Time:</h3>
						<p className="text-gray-900">{isGettingNewsById ? 'Loading...' : eventTime}</p>
					</div>
				</div>

				{!isGettingNewsById ? (
					<div className="mb-4">
						<Image
							src={`/images/news/${image}`}
							alt={title}
							width={600}
							height={400}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
				) : (
					<p className="text-gray-500">Loading image...</p>
				)}

				<div className="bg-white h-auto p-2 mb-4">
					{isGettingNewsById ? <p className="text-gray-500">Loading preview...</p> : <PreviewRenderer data={content} />}
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

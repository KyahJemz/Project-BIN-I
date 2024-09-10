"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import PreviewRenderer from "@/components/EditorJsRenderer/PreviewRenderer";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/stores/useEditorStore";
import { useGetNewsByIdHook } from "@/hooks/news.hooks";
import { formatFullDate } from "@/utils/utilities";

export default function NewsId({ params }: { params: { id: string } }) {
	const router = useRouter();

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>("N/A");
	const [author, setAuthor] = useState<string>("N/A");
	const [description, setDescription] = useState<string>("N/A");
	const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());
	const [updatedAt, setUpdatedAt] = useState<string>(new Date().toISOString().toString());
	const [image, setImage] = useState<string>("");
	const [content, setContent] = useState<[]>([]);

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
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (getNewsByIdResponse) {
			setEditorData(JSON.parse(getNewsByIdResponse?.content ?? "[]") ?? content);
			setTitle(getNewsByIdResponse?.title ?? title);
			setAuthor(getNewsByIdResponse?.author ?? author);
			setDescription(getNewsByIdResponse?.description ?? description);
			setCreatedAt(getNewsByIdResponse?.createdAt ?? createdAt);
			setUpdatedAt(getNewsByIdResponse?.updatedAt ?? updatedAt);
			setImage(getNewsByIdResponse?.image ?? image);
			setContent(JSON.parse(getNewsByIdResponse?.content ?? "[]")?.blocks ?? content);
		}
		// eslint-disable-next-line
	}, [getNewsByIdResponse]);

	return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">{isGettingNewsById ? 'Loading...' : title}</h1>
				<p className="text-sm text-gray-500 mb-2">{isGettingNewsById ? 'Loading...' : `By ${author}`}</p>
				<p className="text-sm text-gray-500 mb-4 border-b border-gray-500 pb-4">
					{isGettingNewsById
						? 'Loading...'
						: `Published ${formatFullDate(createdAt)} | Updated ${formatFullDate(updatedAt)}`}
				</p>

				<p className="text-lg text-gray-900 mb-4">{isGettingNewsById ? 'Loading...' : description}</p>

				{isGettingNewsById ? (
					<p className="text-gray-500">Loading image...</p>
				) : image && (
					<div className="mb-4">
						<Image
							src={`/images/news/${image}`}
							alt={title}
							width={600}
							height={400}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
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

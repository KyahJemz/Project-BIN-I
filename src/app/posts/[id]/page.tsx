"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import PreviewRenderer from "@/components/EditorJsRenderer/PreviewRenderer";
import { useRouter } from "next/navigation";
import { useGetPostByIdHook } from "@/hooks/posts.hooks";
import { useEditorStore } from "@/stores/useEditorStore";
import { formatFullDate } from "@/utils/utilities";

export default function PostId({ params }: { params: { id: string } }) {
	const router = useRouter();

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());
	const [updatedAt, setUpdatedAt] = useState<string>(new Date().toISOString().toString());
	const [image, setImage] = useState<string>("");
	const [content, setContent] = useState<[]>([]);

	const {
		getPostById,
		isLoading: isGettingPostById,
		error: getPostByIdError,
		response: getPostByIdResponse,
	} = useGetPostByIdHook();

	useEffect(() => {
		const fetchData = async () => {
			await getPostById(params.id);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (getPostByIdResponse) {
			setEditorData(JSON.parse(getPostByIdResponse?.content ?? "[]") ?? content);
			setTitle(getPostByIdResponse?.title ?? title);
			setAuthor(getPostByIdResponse?.author ?? author);
			setDescription(getPostByIdResponse?.description ?? description);
			setCreatedAt(getPostByIdResponse?.createdAt ?? createdAt);
			setUpdatedAt(getPostByIdResponse?.updatedAt ?? updatedAt);
			setImage(getPostByIdResponse?.image ?? image);
			setContent(JSON.parse(getPostByIdResponse?.content ?? "[]")?.blocks ?? content);
		}
	}, [getPostByIdResponse]);

	return (
		<main>
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">
					{isGettingPostById ? 'Loading...' : title}
				</h1>
				<p className="text-sm text-gray-500 mb-2">
					{isGettingPostById ? 'Loading...' : `By ${author}`}
				</p>
				<p className="text-sm text-gray-500 mb-4 border-b border-gray-500 pb-4">
					{isGettingPostById
						? 'Loading...'
						: `Published ${formatFullDate(createdAt)} | Updated ${formatFullDate(updatedAt)}`}
				</p>
				<p className="text-lg text-gray-900 mb-4">
					{isGettingPostById ? 'Loading...' : description}
				</p>

				{isGettingPostById ? (
					<p className="text-gray-500">Loading image...</p>
				) : image && (
					<div className="mb-4">
						<Image
							src={`/images/posts/${image}`}
							alt={title}
							width={600}
							height={400}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
				)}

				<div className="bg-white h-auto p-2 mb-4">
					{isGettingPostById ? <p className="text-gray-500">Loading preview...</p> : <PreviewRenderer data={content} />}
				</div>

				<div className="w-full mt-6 flex justify-end">
					<button
						onClick={() => router.back()}
						className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
					>
						Go Back
					</button>
				</div>
			</div>
		</main>
	);

};

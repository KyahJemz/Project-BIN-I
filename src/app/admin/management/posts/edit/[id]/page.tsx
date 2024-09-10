'use client';

import {
	useGetPostByIdHook,
	useUpdatePostHook,
} from '@/hooks/posts.hooks';
import {
	useUploadFileHook,
} from '@/hooks/files.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEditorStore } from '@/stores/useEditorStore';
import Image from 'next/image';
import PostPreview from '@/components/PostPreview/page';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

interface EditPostProps {
	params: {
		id: string;
	};
}

const IdEditPost = ({ params }: EditPostProps) => {
	const router = useRouter();
	const [isPreview, setIsPreview] = useState<boolean>(false);

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [content, setContent] = useState(null);
	const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);

	const {
		getPostById,
		isLoading: isGettingPostById,
		response: getPostByIdResponse,
	} = useGetPostByIdHook();

	const {
		updatePost,
		isLoading: isUpdatingPost,
		response: updatePostResponse,
	} = useUpdatePostHook();

	const {
		uploadFile,
		isLoading: isUploadingFile,
		response: uploadFileResponse,
	} = useUploadFileHook();

	useEffect(() => {
		getPostById(params.id);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (getPostByIdResponse) {
			setTitle(getPostByIdResponse?.title || '');
			setAuthor(getPostByIdResponse?.author || '');
			setDescription(getPostByIdResponse?.description || '');
			setImage(getPostByIdResponse?.image || '');
			setCreatedAt(getPostByIdResponse?.createdAt || '');
			const parsedContent = JSON.parse(getPostByIdResponse?.content ?? '[]');
			setContent(parsedContent);
			setEditorData(parsedContent);
		}
		// eslint-disable-next-line
	}, [getPostByIdResponse]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setUploadedImage(file);
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		if (uploadFileResponse) {
			handleUpdatePost(uploadFileResponse.fileName);
		}
		// eslint-disable-next-line
	}, [uploadFileResponse]);

	useEffect(() => {
		if (updatePostResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [updatePostResponse]);

	const handleUpdatePost = (fileName?: string) => {
		const updatedPost = {
			title,
			author,
			description,
			image: fileName || image,
			content: JSON.stringify(editorData),
		};
		updatePost(params.id, updatedPost);
	};

	const handleSubmit = () => {
		if (uploadedImage) {
			uploadFile(uploadedImage, params.id, 'posts');
		} else {
			handleUpdatePost();
		}
	};

	return (
		<main>
			<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
				<h1 className="text-xl font-semibold text-gray-800 mb-4">Edit Post</h1>
				<div className="space-y-4 border-t">
					{isPreview ? (
						<PostPreview
							post={{
								title,
								author,
								description,
								image,
								createdAt,
							}}
						/>
					) : (
						<>
							<div>
								<label htmlFor="title" className="block text-gray-700 font-medium text-sm mb-1 mt-4">
									Title<a className="text-red-500"> *</a>
								</label>
								{isGettingPostById ?
									'Loading...'
									: (
										<input
											id="title"
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
										/>
									)
								}
							</div>

							<div>
								<label htmlFor="author" className="block text-gray-700 font-medium text-sm mb-1">
									Author<a className="text-red-500"> *</a>
								</label>
								{isGettingPostById ?
									'Loading...'
									: (
										<input
											id="author"
											type="text"
											value={author}
											onChange={(e) => setAuthor(e.target.value)}
											className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
										/>
									)
								}
							</div>

							<div>
								<label htmlFor="description" className="block text-gray-700 font-medium text-sm mb-1">
									Description<a className="text-red-500"> *</a>
								</label>
								{isGettingPostById ?
									'Loading...'
									: (
										<textarea
											id="description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
										/>
									)
								}
							</div>

							<div>
								<label htmlFor="image" className="block text-gray-700 font-medium text-sm mb-1">
									Image
								</label>
								{image && !uploadedImage && (
									<Image
										width={200}
										height={200}
										src={`/images/posts/${image}`}
										alt="Preview"
										className="w-24 h-24 object-cover rounded-md border border-gray-300"
									/>
								)}
								{isGettingPostById ?
									'Loading...'
									: (
										<input
											type="file"
											accept="image/*"
											onChange={handleFileChange}
											className="block w-full mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
										/>
									)
								}
							</div>

							<div className="mb-4">
								<h2 className="text-sm font-semibold text-gray-800 mb-2">Content</h2>
								<div className="border border-gray-300 rounded-md p-2">
									{content ? (
										<Editor holder="editorjs-container" content={content} />
									) : (
										<p>No content provided.</p>
									)}
								</div>
							</div>
						</>
					)}

					<div className="flex justify-end gap-4">
						{isPreview ? null : (
							<button
								onClick={() => router.back()}
								className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
								disabled={isUpdatingPost || isUploadingFile}
							>
								Go Back
							</button>
						)}
						<button
							onClick={() => setIsPreview(!isPreview)}
							className="font-semibold bg-gray-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
						>
							{isPreview ? 'Edit' : 'Preview'}
						</button>
						{isPreview ? null : (
							<button
								onClick={handleSubmit}
								className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
								disabled={isUpdatingPost || isUploadingFile}
							>
								{isUpdatingPost || isUploadingFile ? 'Updating...' : 'Update Post'}
							</button>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default IdEditPost;

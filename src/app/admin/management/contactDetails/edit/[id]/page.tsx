"use client";

import {
	useGetContactDetailsByIdHook,
	useUpdateContactDetailsHook,
} from '@/hooks/contactDetails.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ContactDetailsPreview from '@/components/ContactDetailsPreview/page';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

const IdEditContactDetails = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [name, setName] = useState<string>('');
	const [contactDetails, setContactDetails] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [priorityIndex, setPriorityIndex] = useState<string>('');
	const [createdAt, setCreatedAt] = useState<string>('');

	const {
		getContactDetailsById,
		isLoading: isGettingContactDetailsById,
		error: getContactDetailsByIdError,
		response: getContactDetailsByIdResponse,
	} = useGetContactDetailsByIdHook();

	const {
		updateContactDetails,
		isLoading: isUpdatingContactDetails,
		error: updateContactDetailsError,
		response: updateContactDetailsResponse,
	} = useUpdateContactDetailsHook();

	useEffect(() => {
		const fetch = async () => {
			await getContactDetailsById(params.id);
		};
		fetch();
	}, [params.id]);

	useEffect(() => {
		if (getContactDetailsByIdResponse) {
			setName(getContactDetailsByIdResponse?.name || '');
			setContactDetails(getContactDetailsByIdResponse?.contactDeails || '');
			setType(getContactDetailsByIdResponse?.type || '');
			setDescription(getContactDetailsByIdResponse?.description || '');
			setPriorityIndex(getContactDetailsByIdResponse?.priorityIndex || '');
			setCreatedAt(getContactDetailsByIdResponse.createdAt || '');
		}
	}, [getContactDetailsByIdResponse]);

	useEffect(() => {
		if (updateContactDetailsResponse) {
			router.back();
		}
	}, [updateContactDetailsResponse]);

	function onUpdateContactDetailsClicked() {
		updateContactDetails(params.id, {
			name,
			contactDetails,
			type,
			description,
			priorityIndex,
		});
	}
		
	return (
		<>
			{isGettingContactDetailsById && !getContactDetailsByIdResponse ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : (
				<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
					<h1 className="text-xl font-semibold text-gray-800 mb-4">Edit ContactDetails</h1>
					<div className="space-y-4">
	
						<div>
							<label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-sm">Title</label>
							<input
								id="title"
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>
	
						<div>
							<label htmlFor="author" className="block text-gray-700 font-medium mb-1 text-sm">Author</label>
							<input
								id="author"
								type="text"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>
	
						<div>
							<label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
							<input
								id="description"
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>
	
						<div>
							<label htmlFor="image" className="block text-gray-700 font-medium mb-1 text-sm">Image</label>
	
							{image && !uploadedImage && (
								<div className="mb-4">
									<Image
										width={400}
										height={400}
										src={"/images/news/" + image}
										alt="Current preview"
										className="w-24 h-24 object-cover rounded-md border border-gray-300"
									/>
								</div>
							)}
	
							{image && uploadedImage && (
								<div className="mb-4">
									<Image
										width={400}
										height={400}
										src={image}
										alt="Current preview"
										className="w-24 h-24 object-cover rounded-md border border-gray-300"
									/>
								</div>
							)}
	
							<label htmlFor="file-upload" className="block text-gray-700 font-medium mb-1 text-sm">Upload New Image</label>
							<input
								id="file-upload"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer text-sm"
							/>
						</div>
	
						<div className="mb-4">
							<h2 className="text-sm font-semibold text-gray-800 mb-2">Content</h2>
							<div className="border border-gray-300 rounded-md p-2">
								{content ? <Editor holder="editorjs-container" content={content}/> : 'No content provided.'}
							</div>
						</div>
	
	
						<div className="text-right space-x-2">
							<button
								onClick={() => isPreview ? setIsPreview(false) : setIsPreview(true)}
								className="px-4 py-2 text-sm text-white bg-gray-600 hover:bg-gray-700 rounded-md"
							>
								{isPreview ? 'Edit' : 'Preview'}
							</button>
							<button
								onClick={onUpdateContactDetailsClicked}
								className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
								disabled={isUpdatingContactDetails || isUploadingFile}
							>
								{(isUpdatingContactDetails || isUploadingFile) ? 'Updating...' : 'Update ContactDetails'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
	
};

export default IdEditContactDetails;

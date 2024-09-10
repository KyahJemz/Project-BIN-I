"use client";

import {
	useGetEventByIdHook,
	useUpdateEventHook,
} from '@/hooks/events.hooks';
import {
	useUploadFileHook,
} from '@/hooks/files.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEditorStore } from '@/stores/useEditorStore';
import Image from 'next/image';
import EventPreview from '@/components/EventPreview/page';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

const IdEditEvent = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const [isPreview, setIsPreview] = useState<boolean>(false);

	const { editorData, setEditorData } = useEditorStore();
	const [title, setTitle] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [status, setStatus] = useState<string>('upcoming');
	const [content, setContent] = useState(null);
	const [createdAt, setCreatedAt] = useState<string>(new Date().toISOString().toString());
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [eventStartTime, setEventStartTime] = useState<string>('');
	const [eventEndTime, setEventEndTime] = useState<string>('');
	const [eventDate, setEventDate] = useState<string>('');
	const [eventLocation, setEventLocation] = useState<string>('');

	const {
		getEventById,
		isLoading: isGettingEventById,
		error: getEventByIdError,
		response: getEventByIdResponse,
	} = useGetEventByIdHook();

	const {
		updateEvent,
		isLoading: isUpdatingEvent,
		error: updateEventError,
		response: updateEventResponse,
	} = useUpdateEventHook();

	const {
		uploadFile,
		isLoading: isUploadingFile,
		error: uploadFileError,
		response: uploadFileResponse,
	} = useUploadFileHook();

	useEffect(() => {
		const fetch = async () => {
			await getEventById(params.id);
		};
		fetch();
		// eslint-disable-next-line
	}, [params.id]);

	useEffect(() => {
		if (getEventByIdResponse) {
			setTitle(getEventByIdResponse?.title || '');
			setAuthor(getEventByIdResponse?.author || '');
			setDescription(getEventByIdResponse?.description || undefined);
			setImage(getEventByIdResponse?.image || undefined);
			setCreatedAt(getEventByIdResponse?.createdAt || '');
			setEventDate(getEventByIdResponse?.eventDate || '');
			setStatus(getEventByIdResponse?.status || '');
			setContent(JSON.parse(getEventByIdResponse?.content ?? []) || '');
			setEditorData(JSON.parse(getEventByIdResponse?.content ?? []) || '');
			setEventStartTime(getEventByIdResponse?.eventTime?.split('-')?.[0]?.trim()?.toString() || '');
			setEventEndTime(getEventByIdResponse?.eventTime?.split('-')?.[1]?.trim()?.toString() || '');
			setEventDate(getEventByIdResponse?.eventDate || '');
			setEventLocation(getEventByIdResponse?.eventLocation || '');
		}
		// eslint-disable-next-line
	}, [getEventByIdResponse]);

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
			onUpdateEvent(uploadFileResponse.fileName)
		}
		// eslint-disable-next-line
	}, [uploadFileResponse]);

	useEffect(() => {
		if (updateEventResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [updateEventResponse]);

	function onUpdateEventClicked() {
		if (uploadedImage) {
			uploadFile(uploadedImage as File, params.id, 'events');
		} else {
			onUpdateEvent();
		}
	}

	function onUpdateEvent(name: string | undefined = undefined) {
		updateEvent(params.id, {
			title,
			author,
			content,
			description,
			eventDate,
			eventTime: `${eventStartTime} - ${eventEndTime}`,
			eventLocation,
			status,
			image: name ?? undefined,
			content: JSON.stringify(editorData),
		});
	}

	return (
		<main>
			{isGettingEventById && !getEventByIdResponse ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : (
				<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
					<h1 className="text-xl font-semibold text-gray-800 mb-4">Edit Event</h1>
					<div className="space-y-4 border-t">

						{isPreview ? (
							<EventPreview event={{ title, author, description, image, createdAt }} />
						) : (
							<>
								<div>
									<label htmlFor="title" className="block text-gray-700 font-medium mb-1 text-sm mt-4">Title<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="title"
												type="text"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="author" className="block text-gray-700 font-medium mb-1 text-sm">Author<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="author"
												type="text"
												value={author}
												onChange={(e) => setAuthor(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="eventDate" className="block text-gray-700 font-medium mb-1 text-sm">Event Date<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="eventDate"
												type="date"
												value={eventDate}
												onChange={(e) => setEventDate(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="eventStartTime" className="block text-gray-700 font-medium mb-1 text-sm">Event Start Time<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="eventStartTime"
												type="time"
												value={eventStartTime}
												onChange={(e) => setEventStartTime(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="eventEndTime" className="block text-gray-700 font-medium mb-1 text-sm">Event End Time<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="eventEndTime"
												type="time"
												value={eventEndTime}
												onChange={(e) => setEventEndTime(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="eventLocation" className="block text-gray-700 font-medium mb-1 text-sm">Event Location<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="eventLocation"
												type="text"
												value={eventLocation}
												onChange={(e) => setEventLocation(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="status" className="block text-gray-700 font-medium mb-1 text-sm">Status<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<select
												id="status"
												value={author}
												onChange={(e) => setAuthor(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											>
												<option value="upcoming">Upcoming</option>
												<option value="canceled">Canceled</option>
												<option value="rescheduled">Rescheduled</option>
											</select>
										)
									}
								</div>

								<div>
									<label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">Description<a className="text-red-500"> *</a></label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="description"
												type="text"
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
											/>
										)
									}
								</div>

								<div>
									<label htmlFor="image" className="block text-gray-700 font-medium mb-1 text-sm">Image</label>
									{isGettingEventById ?
										'Loading...'
										: (
											image && (
												<div className="mb-4">
													<Image
														key={"image"}
														width={400}
														height={400}
														src={uploadedImage ? image : `/images/events/${image}`}
														alt="Current preview"
														className="w-24 h-24 object-cover rounded-md border border-gray-300"
													/>
												</div>
											)
										)
									}

									<label htmlFor="file-upload" className="block text-gray-700 font-medium mb-1 text-sm">Upload New Image</label>
									{isGettingEventById ?
										'Loading...'
										: (
											<input
												id="file-upload"
												type="file"
												accept="image/*"
												onChange={handleFileChange}
												className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer text-sm"
											/>
										)
									}
								</div>

								<div className="mb-4">
									<h2 className="text-sm font-semibold text-gray-800 mb-2">Content</h2>
									<div className="border border-gray-300 rounded-md p-2">
										{content ? <Editor holder="editorjs-container" content={content} /> : 'No content provided.'}
									</div>
								</div>

							</>
						)}

						<div className="flex justify-end gap-4">
							{isPreview ? null : (
								<button
									onClick={() => router.back()}
									className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
									disabled={isUpdatingEvent || isUploadingFile}
								>
									Go Back
								</button>
							)}
							<button
								onClick={() => isPreview ? setIsPreview(false) : setIsPreview(true)}
								className="font-semibold bg-gray-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
							>
								{isPreview ? 'Edit' : 'Preview'}
							</button>
							{isPreview ? null : (
								<button
									onClick={onUpdateEventClicked}
									className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
									disabled={isUpdatingEvent || isUploadingFile}
								>
									{(isUpdatingEvent || isUploadingFile) ? 'Updating...' : 'Update Event'}
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</main>
	);

};

export default IdEditEvent;

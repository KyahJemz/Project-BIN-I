"use client";

import {
	useGetContactDetailsByIdHook,
	useUpdateContactDetailsHook,
} from '@/hooks/contactDetails.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const IdEditContactDetails = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [name, setName] = useState<string>('');
	const [contactDetails, setContactDetails] = useState<string>('');
	const [type, setType] = useState<string>('contact number');
	const [description, setDescription] = useState<string>('');
	const [priorityIndex, setPriorityIndex] = useState<string>('1');

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
		// eslint-disable-next-line
	}, [params.id]);

	useEffect(() => {
		if (getContactDetailsByIdResponse) {
			setName(getContactDetailsByIdResponse?.name || '');
			setContactDetails(getContactDetailsByIdResponse?.contactDetails || '');
			setType(getContactDetailsByIdResponse?.type || 'contact number');
			setDescription(getContactDetailsByIdResponse?.description || '');
			setPriorityIndex(getContactDetailsByIdResponse?.priorityIndex || '1');
		}
	}, [getContactDetailsByIdResponse]);

	useEffect(() => {
		if (updateContactDetailsResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [updateContactDetailsResponse]);

	function onUpdateContactDetailsClicked() {
		updateContactDetails(params.id, {
			name,
			contactDetails, 
			type,
			description,
			priorityIndex: priorityIndex.toString(),
		});
	}

	return (
		<main>
			{isGettingContactDetailsById && !getContactDetailsByIdResponse ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : (
				<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
					<h1 className="text-xl font-semibold text-gray-800 mb-4">Edit Contact Details</h1>
					<div className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-gray-700 font-medium mb-1 text-sm">
								Name
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="contactDetails" className="block text-gray-700 font-medium mb-1 text-sm">
								Contact Details
							</label>
							<input
								id="contactDetails"
								type="text"
								value={contactDetails}
								onChange={(e) => setContactDetails(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="type" className="block text-gray-700 font-medium mb-1 text-sm">
								Type
							</label>
							<select
								id="type"
								value={type}
								onChange={(e) => setType(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							>
								<option value="contact number">Contact Number</option>
								<option value="email">Email</option>
								<option value="website">Website</option>
								<option value="social media">Social Media</option>
							</select>
						</div>

						<div>
							<label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">
								Description
							</label>
							<input
								id="description"
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="priorityIndex" className="block text-gray-700 font-medium mb-1 text-sm">
								Priority
							</label>
							<select
								id="priorityIndex"
								value={priorityIndex}
								onChange={(e) => setPriorityIndex(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							>
								<option value="1">1 (Highest Priority)</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5 (Lowest Priority)</option>
							</select>
						</div>

						<div className="text-right space-x-2">
							<button
								onClick={onUpdateContactDetailsClicked}
								className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
								disabled={isUpdatingContactDetails}
							>
								{isUpdatingContactDetails ? 'Updating...' : 'Update Contact Details'}
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default IdEditContactDetails;

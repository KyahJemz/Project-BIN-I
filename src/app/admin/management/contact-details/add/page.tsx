"use client";

import {
	useCreateContactDetailsHook
} from '@/hooks/contactDetails.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const IdEditContactDetails = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [name, setName] = useState<string>('');
	const [contactDetails, setContactDetails] = useState<string>('');
	const [type, setType] = useState<string>('contact number');
	const [description, setDescription] = useState<string>('');
	const [priorityIndex, setPriorityIndex] = useState<string>('1');

	const {
		createContactDetails,
		isLoading: isCreatingContactDetails,
		response: createContactDetailsResponse,
	} = useCreateContactDetailsHook();

	useEffect(() => {
		if (createContactDetailsResponse) {
			router.back();
		}
	}, [createContactDetailsResponse]);

	function onCreateContactDetailsClicked() {
		createContactDetails({
			name,
			contactDetails,
			type,
			description,
			priorityIndex,
		});
	}

	return (
		<main>
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-xl font-semibold text-gray-800 mb-4">Create Contact Details</h1>
			
			{/* Name */}
			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 font-medium mb-1 text-sm">Name</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
				/>
			</div>

			{/* Contact Details */}
			<div className="mb-4">
				<label htmlFor="contactDetails" className="block text-gray-700 font-medium mb-1 text-sm">Contact Details</label>
				<input
					id="contactDetails"
					type="text"
					value={contactDetails}
					onChange={(e) => setContactDetails(e.target.value)}
					className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
				/>
			</div>

			{/* Type */}
			<div className="mb-4">
				<label htmlFor="type" className="block text-gray-700 font-medium mb-1 text-sm">Type</label>
				<select
					id="type"
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
				>
					<option value="contact number">Contact Number</option>
					<option value="email">Email</option>
					<option value="website">Website</option>
					<option value="social media">Social Media</option>
				</select>
			</div>

			{/* Description */}
			<div className="mb-4">
				<label htmlFor="description" className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
				/>
			</div>

			{/* Priority Index */}
			<div className="mb-6">
				<label htmlFor="priorityIndex" className="block text-gray-700 font-medium mb-1 text-sm">Priority Index (1-5)</label>
				<select
					id="priorityIndex"
					value={priorityIndex}
					onChange={(e) => setPriorityIndex(e.target.value)}
					className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>

			{/* Buttons */}
			<div className="text-right">
				<button
					onClick={onCreateContactDetailsClicked}
					className="px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md"
					disabled={isCreatingContactDetails}
				>
					{isCreatingContactDetails ? 'Creating...' : 'Create Contact Details'}
				</button>
			</div>
		</div>
		</main>
	);
};

export default IdEditContactDetails;

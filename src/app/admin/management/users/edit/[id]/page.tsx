"use client";

import {
	useGetUserByIdHook,
	useUpdateUserHook,
} from '@/hooks/users.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const IdEditUser = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [middleName, setMiddleName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const {
		getUserById,
		isLoading: isGettingUserById,
		response: getUserByIdResponse,
	} = useGetUserByIdHook();

	const {
		updateUser,
		isLoading: isUpdatingUser,
		response: updateUserResponse,
	} = useUpdateUserHook();

	useEffect(() => {
		const fetch = async () => {
			await getUserById(params.id);
		};
		fetch();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (getUserByIdResponse) {
			setFirstName(getUserByIdResponse?.firstName || '');
			setLastName(getUserByIdResponse?.lastName || '');
			setMiddleName(getUserByIdResponse?.middleName || '');
			setEmail(getUserByIdResponse?.email || '');
			setPassword('');
		}
	}, [getUserByIdResponse]);

	useEffect(() => {
		if (updateUserResponse) {
			router.back();
		}
		// eslint-disable-next-line
	}, [updateUserResponse]);

	const onUpdateUserClicked = () => {
		updateUser(params.id, {
			firstName,
			lastName,
			middleName,
			email,
			password: password === '' ? undefined : password,
		});
	};

	return (
		<main>
			{isGettingUserById && !getUserByIdResponse ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : (
				<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
					<h1 className="text-xl font-semibold text-gray-800 mb-4">Edit User</h1>
					<div className="space-y-4">
						<div>
							<label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-sm">First Name<a className="text-red-500"> *</a></label>
							<input
								id="firstName"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="middleName" className="block text-gray-700 font-medium mb-1 text-sm">Middle Name</label>
							<input
								id="middleName"
								type="text"
								value={middleName}
								onChange={(e) => setMiddleName(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-sm">Last Name<a className="text-red-500"> *</a></label>
							<input
								id="lastName"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">Email<a className="text-red-500"> *</a></label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">Password</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
							/>
						</div>

						<div className="flex justify-end gap-4">
							<button
								onClick={() => router.back()}
								className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
								disabled={isUpdatingUser}
							>
								Go Back
							</button>
							<button
								onClick={onUpdateUserClicked}
								className="font-semibold bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded"
								disabled={isUpdatingUser}
							>
								{isUpdatingUser ? 'Updating...' : 'Update User'}
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default IdEditUser;

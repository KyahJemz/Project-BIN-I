"use client";

import {
	useCreateAccountHook,
} from '@/hooks/accounts.hooks';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const IdAddAccount = () => {
	const router = useRouter();

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [position, setPosition] = useState<string>('');
	const [department, setDepartment] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const {
		createAccount,
		isLoading: isCreatingAccount,
		response: createAccountResponse,
		error: createAccountError,
	} = useCreateAccountHook();

	const onCreateAccountClicked = () => {
		createAccount({
			firstName,
			lastName,
			position,
			department,
			email,
			password,
			type: 'admin'
		});
	};

	React.useEffect(() => {
		if (createAccountResponse) {
			router.push('/accounts'); // Navigate to the accounts page or another page upon successful creation
		}
	}, [createAccountResponse]);

	return (
		<main>
		<div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
			<h1 className="text-xl font-semibold text-gray-800 mb-4">Add New Account</h1>
			<div className="space-y-4">
				<div>
					<label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-sm">First Name</label>
					<input
						id="firstName"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
					/>
				</div>

				<div>
					<label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-sm">Last Name</label>
					<input
						id="lastName"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
					/>
				</div>

				<div>
					<label htmlFor="position" className="block text-gray-700 font-medium mb-1 text-sm">Position</label>
					<input
						id="position"
						type="text"
						value={position}
						onChange={(e) => setPosition(e.target.value)}
						className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
					/>
				</div>

				<div>
					<label htmlFor="department" className="block text-gray-700 font-medium mb-1 text-sm">Department</label>
					<input
						id="department"
						type="text"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
					/>
				</div>

				<div>
					<label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">Email</label>
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

				<div className="text-right space-x-2">
					<button
						onClick={onCreateAccountClicked}
						className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
						disabled={isCreatingAccount}
					>
						{isCreatingAccount ? 'Creating...' : 'Create Account'}
					</button>
				</div>
			</div>
		</div>
		</main>
	);
};

export default IdAddAccount;

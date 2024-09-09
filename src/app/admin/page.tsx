"use client"

import { use, useEffect, useState } from 'react';
import { useValidateAccountHook } from "@/hooks/accounts.hooks";

export default function AdminLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		validateAccount,
		isLoading: isValidatingAccount,
		error: validateAccountError,
		response: validateAccountResponse,
	} = useValidateAccountHook();

	const handleSubmit = (e) => {
		e.preventDefault();
		validateAccount({ email, password });
		console.log('Email:', email);
		console.log('Password:', password);
	};

	useEffect(() => {
		console.log(validateAccountResponse, " - " ,validateAccountError)
	}, [validateAccountResponse,validateAccountError])
	

	return (
		<main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
			<section className="bg-white text-dark-gray py-8 px-10 shadow-2xl rounded-2xl w-full max-w-md">
				<h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Welcome Back</h1>
				<p className="text-center text-sm text-gray-500 mb-8">Please log in to your account</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							x
						</div>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="you@example.com"
							required
						/>
					</div>

					<div className="relative">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							x
						</div>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="••••••••"
							required
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Log In
						</button>
					</div>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Forgot password? <a href="#" className="text-blue-500 hover:underline">Reset here</a>
				</p>
			</section>
		</main>
	);
}


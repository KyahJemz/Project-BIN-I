"use client";

import { useEffect, useState } from 'react';
import { useValidateAccountHook } from "@/hooks/accounts.hooks";
import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/useAccountStore';
import { useCreateUserHook } from '@/hooks/users.hooks';

export default function AdminLogin() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const {
        createUser,
        isLoading: isCreatingUser,
        error: createUserError,
        response: createUserResponse,
    } = useCreateUserHook();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await createUser({
                firstName, middleName, lastName, email, password,
                token: null,
                deletedAt: null
            });
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if (createUserResponse) {
            router.replace('/user');
        }
        if (createUserError) {
            setError('Invalid email or password.');
        }
    }, [createUserResponse, createUserError, router]);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Bin-I User Registration</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Juan"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                        <input
                            id="middleName"
                            type="text"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Mabait"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Dela Cruz"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                        disabled={isCreatingUser}
                    >
                        {isCreatingUser ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </section>
        </main>
    );
}

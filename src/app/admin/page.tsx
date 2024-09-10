"use client";

import { useEffect, useState } from 'react';
import { useValidateAccountHook } from "@/hooks/accounts.hooks";
import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/useAccountStore';

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { setAccountData } = useAccountStore((state) => ({
        setAccountData: state.setAccountData,
    }));

    const {
        validateAccount,
        isLoading: isValidatingAccount,
        error: validateAccountError,
        response: validateAccountResponse,
    } = useValidateAccountHook();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await validateAccount({ email, password });
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if (validateAccountResponse) {
            setAccountData(validateAccountResponse);
            router.replace('/admin/management');
        }
        if (validateAccountError) {
            setError('Invalid email or password.');
        }
    }, [validateAccountResponse, validateAccountError, setAccountData, router]);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Admin Login</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        disabled={isValidatingAccount}
                    >
                        {isValidatingAccount ? 'Logging In...' : 'Log In'}
                    </button>
                </form>
            </section>
        </main>
    );
}

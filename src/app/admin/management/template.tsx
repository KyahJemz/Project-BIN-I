"use client";

import { sidebarItems } from '@/app/constants';
import { useAccountsAuthenticateHook } from '@/hooks/authAccounts.hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { authenticate, response, isLoading, error } = useAccountsAuthenticateHook();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        authenticate();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (error) {
            router.push('/admin');
        } else if (response) {
            // router.push('/admin/management/accounts');
        }
    }, [response, error, router]);

    if (isLoading) {
        return <></>;
    }

    if (!response) {
        return <></>;
    }

    const handleClick = (item) => {
        if (item.onClickEvent) {
            item.onClickEvent();
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden p-4 text-gray-700 focus:outline-none"
                aria-label="Toggle Sidebar"
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`w-64 h-full bg-white shadow-md p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'block' : 'hidden'
                    } md:block`}
            >
                <div className="text-xl font-semibold mb-6 text-gray-700">Bin-I Management</div>
                <nav className="space-y-2">
                    <ul>
                        {sidebarItems.map((item, key) => (
                            <li key={key} className="my-2">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                        {item.name}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleClick(item)}
                                        className="flex items-center gap-3 p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                                    >
                                        <item.icon className="h-6 w-6" aria-hidden="true" />
                                        {item.name}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                {children}
            </div>
        </div>
    );
}

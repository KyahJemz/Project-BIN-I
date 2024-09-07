"use client";
import { sidebarItems } from '@/app/constants';
import Link from 'next/link';
import React, { useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                                <Link href={item.href} className="flex items-center gap-3 p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors">
                                    <item.icon className="w-5 h-5 text-gray-500" />
                                    <span>{item.name}</span>
                                </Link>
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
};

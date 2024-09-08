import React from "react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-around gap-20 p-4 max-w-7xl mx-auto">
                <div>
                    <h3 className="text-m font-bold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="/announcements" className="hover:underline">Announcements</a></li>
                        <li><a href="/events" className="hover:underline">Events</a></li>
                        <li><a href="/news" className="hover:underline">News</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-m font-bold mb-4">Waste Management</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="/schedules" className="hover:underline">Schedules</a></li>
                        <li><a href="/routes" className="hover:underline">Routes</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-m font-bold mb-4">Contact</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="/about" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto flex flex-row items-center justify-around  mt-4 pt-4 border-t-2 border-white p4 max-w-7xl mx-auto">
                <Image width={100} height={100} src="/images/logo.png" alt="BIN-I Logo" className="w-24 h-auto mx-auto md:mx-0" />
                <p className="text-sm">BIN-I: Informative Waste Management Portal for Cavite City</p>
                <p className="text-sm">&copy; 2024 All Rights Reserved.</p>
            </div>
        </footer>
    );
}
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 mb-6 md:mb-0">
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
                
                <div className="mb-6 md:mb-0">
                    <img src="/images/logo.png" alt="BIN-I Logo" className="w-24 h-auto mx-auto md:mx-0"/>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-sm">&copy; 2024 BIN-I: INFORMATIVE WASTE MANAGEMENT PORTAL FOR CAVITE CITY. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
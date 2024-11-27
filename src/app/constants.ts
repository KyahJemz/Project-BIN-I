"use client"

import { LatLngExpression } from "leaflet"
import { AwardIcon, BookIcon, BookTextIcon, CalendarCheck2Icon, CalendarCheckIcon, LayoutDashboardIcon, LogOutIcon, LogsIcon, MegaphoneIcon, NewspaperIcon, User2Icon, UserIcon, UsersIcon, WaypointsIcon } from "lucide-react"


// Menu Items

export const headerMoreItems = [
    { name: 'Events', description: 'Explore upcoming events and activities.', href: '/events', icon: CalendarCheckIcon },
    { name: 'News', description: 'Stay updated with the latest news and updates.', href: '/news', icon: NewspaperIcon },
    { name: 'Announcements', description: 'View important announcements and updates here.', href: '/announcements', icon: MegaphoneIcon },
    { name: 'Posts', description: 'View random posts and updates here.', href: '/posts', icon: BookTextIcon },
    { name: 'Schedules', description: 'Check the schedule for garbage collection in your area', href: '/schedules', icon: CalendarCheck2Icon },
    { name: 'Routes', description: 'View and track waste collection routes and timings', href: '/routes', icon: WaypointsIcon },
]

export const loginItems = [
    { name: 'User Login', description: 'Login to your account to access user features', href: '/user', icon: UserIcon },
    { name: 'User Registration', description: 'Create an account to access user features', href: '/user/registration', icon: UserIcon },
    { name: 'Admin Login', description: 'Admin Only', href: '/admin', icon: User2Icon },
]

export const headerItems = [
    { name: 'Home', href: '/', items: null },
    { name: 'About', href: '/about', items: null },
    { name: 'News', href: '/news', items: null },
    { name: 'Announcements', href: '/announcements', items: null },
    { name: 'More', href: null, items: headerMoreItems },
    { name: 'login', href: null, items: loginItems },
]

export const headerButton = {
    name: 'Login',
    href: '/admin'
}
export const headerTitle = {
    name: 'BIN-I: Waste Management Portal',
    href: '/',
    image: "/images/logo.png",
}


// Leaflet Map Constants

export const defaultZoom = 15
export const defaultPosition: LatLngExpression = [14.48325406944822, 120.90889155864716]
export const routeColors = [
    'green',
    'blue',
    'red',
    'purple',
    'orange',
    'yellow',
    'pink',
    'black',
]
export const routeColorsWeight = 5;



// Admin Sidebar Constants

export const sidebarItems = [
    { name: 'Accounts', href: '/admin/management/accounts', icon: UsersIcon },
    { name: 'Logs', href: '/admin/management/logs', icon: LogsIcon },
    { name: 'Announcements', href: '/admin/management/announcements', icon: MegaphoneIcon },
    { name: 'Posts', href: '/admin/management/posts', icon: BookTextIcon },
    { name: 'News', href: '/admin/management/news', icon: NewspaperIcon },
    { name: 'Events', href: '/admin/management/events', icon: CalendarCheckIcon },
    { name: 'Schedules', href: '/admin/management/schedules', icon: CalendarCheck2Icon },
    { name: 'Routes', href: '/admin/management/routes', icon: WaypointsIcon },
    { name: 'Logout', icon: LogOutIcon, onClickEvent: () => (localStorage.removeItem('authorization'),localStorage.removeItem('account'), window.location.reload())},
];

export const sidebarUserItems = [
    { name: 'Tutorials', href: '/user/login/tutorials', icon: BookIcon },
    { name: 'Certificates', href: '/user/login/certificates', icon: AwardIcon },
    { name: 'MyAccount', href: '/user/login/my-profile', icon: UserIcon },
    { name: 'Logout', icon: LogOutIcon, onClickEvent: () => (localStorage.removeItem('authorization'),localStorage.removeItem('account'), window.location.reload())},
];
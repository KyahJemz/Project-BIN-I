import { LatLngExpression } from "leaflet"
import { CalendarCheck2Icon, CalendarCheckIcon, ContactIcon, LayoutDashboardIcon, LogsIcon, MegaphoneIcon, NewspaperIcon, UsersIcon, WaypointsIcon } from "lucide-react"


// Menu Items

export const headerMoreItems = [
    { name: 'Events', description: 'Explore upcoming events and activities.', href: '/events', icon: '' },
    { name: 'News', description: 'Stay updated with the latest news and updates.', href: '/news', icon: '' },
    { name: 'Announcements', description: 'View important announcements and updates here.', href: '/announcements', icon: '' },
    { name: 'Schedules', description: 'Check the schedule for garbage collection in your area', href: '/schedules', icon: '' },
    { name: 'Routes', description: 'View and track waste collection routes and timings', href: '/routes', icon: '' },
    { name: 'Contact', description: 'Get in touch for inquiries and support.', href: '/about', icon: '' },
]
export const headerItems = [
    { name: 'Home', href: '/', items: null },
    { name: 'About', href: '/about', items: null },
    { name: 'News', href: '/news', items: null },
    { name: 'Announcements', href: '/announcements', items: null },
    { name: 'More', href: null, items: headerMoreItems },
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
    { name: 'Dashboard', href: '/admin/management', icon: LayoutDashboardIcon },
    { name: 'Accounts', href: '/admin/management/accounts', icon: UsersIcon },
    { name: 'Logs', href: '/admin/management/logs', icon: LogsIcon },
    { name: 'Contact Details', href: '/admin/management/contact-details', icon: ContactIcon },
    { name: 'Announcements', href: '/admin/management/announcements', icon: MegaphoneIcon },
    { name: 'News', href: '/admin/management/news', icon: NewspaperIcon },
    { name: 'Events', href: '/admin/management/events', icon: CalendarCheckIcon },
    { name: 'Schedules', href: '/admin/management/schedules', icon: CalendarCheck2Icon },
    { name: 'Routes', href: '/admin/management/routes', icon: WaypointsIcon },
];
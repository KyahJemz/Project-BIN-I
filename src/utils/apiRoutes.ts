import { env } from '@/env.mjs';

const apiRoutes = {
	// Accounts
	createAccount: () => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts`, // POST
	validateAccount: () => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts?action=verify`, // POST
	getAccountById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts?id=${id}`, // GET
	getAllAccounts: () => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts`, // GET
	updateAccount: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts?id=${id}`, // PUT
	changeAccountPassword: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts?id=${id}&action=change-password`, // PATCH
	deleteAccount: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/accounts?id=${id}`, // DELETE

	// Announcements
	createAnnouncement: () => `${env.NEXT_PUBLIC_API_BASE_URL}/announcements`, // POST
	getAnnouncementById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/announcements?id=${id}`, // GET
	getAllAnnouncements: () => `${env.NEXT_PUBLIC_API_BASE_URL}/announcements`, // GET
	updateAnnouncement: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/announcements?id=${id}`, // PUT
	deleteAnnouncement: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/announcements?id=${id}`, // DELETE

	// Contact Details
	createContactDetails: () => `${env.NEXT_PUBLIC_API_BASE_URL}/contact-details`, // POST
	getContactDetailsById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/contact-details?id=${id}`, // GET
	getAllContactDetails: () => `${env.NEXT_PUBLIC_API_BASE_URL}/contact-details`, // GET
	updateContactDetails: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/contact-details?id=${id}`, // PUT
	deleteContactDetails: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/contact-details?id=${id}`, // DELETE

	// Events
	createEvent: () => `${env.NEXT_PUBLIC_API_BASE_URL}/events`, // POST
	getEventById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/events?id=${id}`, // GET
	getAllEvents: () => `${env.NEXT_PUBLIC_API_BASE_URL}/events`, // GET
	updateEvent: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/events?id=${id}`, // PUT
	deleteEvent: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/events?id=${id}`, // DELETE

	// Logs
	getLogById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/logs?id=${id}`, // GET
	getAllLogs: () => `${env.NEXT_PUBLIC_API_BASE_URL}/logs`, // GET

	// News
	createNews: () => `${env.NEXT_PUBLIC_API_BASE_URL}/news`, // POST
	getNewsById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/news?id=${id}`, // GET
	getAllNews: () => `${env.NEXT_PUBLIC_API_BASE_URL}/news`, // GET
	updateNews: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/news?id=${id}`, // PUT
	deleteNews: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/news?id=${id}`, // DELETE

	// Routes
	createRoute: () => `${env.NEXT_PUBLIC_API_BASE_URL}/routes`, // POST
	getRouteById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/routes?id=${id}`, // GET
	getAllRoutes: () => `${env.NEXT_PUBLIC_API_BASE_URL}/routes`, // GET
	getRouteByScheduleId: (scheduleId: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/routes?id=${scheduleId}&action=by-schedule`, // GET
	updateRoute: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/routes?id=${id}`, // PUT
	deleteRoute: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/routes?id=${id}`, // DELETE

	// Schedules
	createSchedule: () => `${env.NEXT_PUBLIC_API_BASE_URL}/schedules`, // POST
	getScheduleById: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/schedules?id=${id}`, // GET
	getAllSchedules: () => `${env.NEXT_PUBLIC_API_BASE_URL}/schedules`, // GET
	updateSchedule: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/schedules?id=${id}`, // PUT
	deleteSchedule: (id: string) => `${env.NEXT_PUBLIC_API_BASE_URL}/schedules?id=${id}`, // DELETE

	// Files
	uploadFile: () => `${env.NEXT_PUBLIC_API_BASE_URL}/upload`, // POST
};

export default apiRoutes;
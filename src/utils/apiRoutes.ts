import { IEnvServer } from "@/types/IEnvServer.dto";
import getConfig from "next/config";
const apiRoutes = () => {
    const { serverRuntimeConfig } = getConfig();
    const config = serverRuntimeConfig as IEnvServer;

    return {
        // Accounts
        createAccount: () => `${config.ApiBaseUrl}/accounts`, // POST
        getAccountById: (id: string) => `${config.ApiBaseUrl}/accounts/${id}`, // GET
        getAllAccounts: () => `${config.ApiBaseUrl}/accounts`, // GET
        updateAccount: (id: string) => `${config.ApiBaseUrl}/accounts/${id}`, // PUT
        changeAccountPassword: (id: string) => `${config.ApiBaseUrl}/accounts/${id}/change-password`, // PATCH
        deleteAccount: (id: string) => `${config.ApiBaseUrl}/accounts/${id}`, // DELETE

        // Announcements
        createAnnouncement: () => `${config.ApiBaseUrl}/announcements`, // POST
        getAnnouncementById: (id: string) => `${config.ApiBaseUrl}/announcements/${id}`, // GET
        getAllAnnouncements: () => `${config.ApiBaseUrl}/announcements`, // GET
        updateAnnouncement: (id: string) => `${config.ApiBaseUrl}/announcements/${id}`, // PUT
        deleteAnnouncement: (id: string) => `${config.ApiBaseUrl}/announcements/${id}`, // DELETE

        // Contact Details
        createContactDetail: () => `${config.ApiBaseUrl}/contact-details`, // POST
        getContactDetailById: (id: string) => `${config.ApiBaseUrl}/contact-details/${id}`, // GET
        getAllContactDetails: () => `${config.ApiBaseUrl}/contact-details`, // GET
        updateContactDetail: (id: string) => `${config.ApiBaseUrl}/contact-details/${id}`, // PUT
        deleteContactDetail: (id: string) => `${config.ApiBaseUrl}/contact-details/${id}`, // DELETE

        // Events
        createEvent: () => `${config.ApiBaseUrl}/events`, // POST
        getEventById: (id: string) => `${config.ApiBaseUrl}/events/${id}`, // GET
        getAllEvents: () => `${config.ApiBaseUrl}/events`, // GET
        updateEvent: (id: string) => `${config.ApiBaseUrl}/events/${id}`, // PUT
        deleteEvent: (id: string) => `${config.ApiBaseUrl}/events/${id}`, // DELETE

        // Logs
        getLogById: (id: string) => `${config.ApiBaseUrl}/logs/${id}`, // GET
        getAllLogs: () => `${config.ApiBaseUrl}/logs`, // GET

        // News
        createNews: () => `${config.ApiBaseUrl}/news`, // POST
        getNewsById: (id: string) => `${config.ApiBaseUrl}/news/${id}`, // GET
        getAllNews: () => `${config.ApiBaseUrl}/news`, // GET
        updateNews: (id: string) => `${config.ApiBaseUrl}/news/${id}`, // PUT
        deleteNews: (id: string) => `${config.ApiBaseUrl}/news/${id}`, // DELETE

        // Routes
        createRoute: () => `${config.ApiBaseUrl}/routes`, // POST
        getRouteById: (id: string) => `${config.ApiBaseUrl}/routes/${id}`, // GET
        getAllRoutes: () => `${config.ApiBaseUrl}/routes`, // GET
        getRouteBySchedule: (scheduleId: string) => `${config.ApiBaseUrl}/routes/by-schedule/${scheduleId}`, // GET
        updateRoute: (id: string) => `${config.ApiBaseUrl}/routes/${id}`, // PUT
        deleteRoute: (id: string) => `${config.ApiBaseUrl}/routes/${id}`, // DELETE

        // Schedules
        createSchedule: () => `${config.ApiBaseUrl}/schedules`, // POST
        getScheduleById: (id: string) => `${config.ApiBaseUrl}/schedules/${id}`, // GET
        getAllSchedules: () => `${config.ApiBaseUrl}/schedules`, // GET
        updateSchedule: (id: string) => `${config.ApiBaseUrl}/schedules/${id}`, // PUT
        deleteSchedule: (id: string) => `${config.ApiBaseUrl}/schedules/${id}`, // DELETE
    };
}

export default apiRoutes;
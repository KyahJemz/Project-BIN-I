import { IEnvServer } from "@/types/IEnvServer.dto";
import getConfig from "next/config";
const apiRoutes = () => {
    const { serverRuntimeConfig } = getConfig();
    const config = serverRuntimeConfig as IEnvServer;

    return {
        // Accounts
        createAccount: () => `${config.ApiBaseUrl}/accounts`, // POST
        validateAccount: () => `${config.ApiBaseUrl}/accounts?action=verify`, // POST
        getAccountById: (id: string) => `${config.ApiBaseUrl}/accounts?id=${id}`, // GET
        getAllAccounts: () => `${config.ApiBaseUrl}/accounts`, // GET
        updateAccount: (id: string) => `${config.ApiBaseUrl}/accounts?id=${id}`, // PUT
        changeAccountPassword: (id: string) => `${config.ApiBaseUrl}/accounts?id=${id}&action=change-password`, // PATCH
        deleteAccount: (id: string) => `${config.ApiBaseUrl}/accounts?id=${id}`, // DELETE

        // Announcements
        createAnnouncement: () => `${config.ApiBaseUrl}/announcements`, // POST
        getAnnouncementById: (id: string) => `${config.ApiBaseUrl}/announcements?id=${id}`, // GET
        getAllAnnouncements: () => `${config.ApiBaseUrl}/announcements`, // GET
        updateAnnouncement: (id: string) => `${config.ApiBaseUrl}/announcements?id=${id}`, // PUT
        deleteAnnouncement: (id: string) => `${config.ApiBaseUrl}/announcements?id=${id}`, // DELETE

        // Contact Details
        createContactDetails: () => `${config.ApiBaseUrl}/contact-details`, // POST
        getContactDetailsById: (id: string) => `${config.ApiBaseUrl}/contact-details?id=${id}`, // GET
        getAllContactDetails: () => `${config.ApiBaseUrl}/contact-details`, // GET
        updateContactDetails: (id: string) => `${config.ApiBaseUrl}/contact-details?id=${id}`, // PUT
        deleteContactDetails: (id: string) => `${config.ApiBaseUrl}/contact-details?id=${id}`, // DELETE

        // Events
        createEvent: () => `${config.ApiBaseUrl}/events`, // POST
        getEventById: (id: string) => `${config.ApiBaseUrl}/events?id=${id}`, // GET
        getAllEvents: () => `${config.ApiBaseUrl}/events`, // GET
        updateEvent: (id: string) => `${config.ApiBaseUrl}/events?id=${id}`, // PUT
        deleteEvent: (id: string) => `${config.ApiBaseUrl}/events?id=${id}`, // DELETE

        // Logs
        getLogById: (id: string) => `${config.ApiBaseUrl}/logs?id=${id}`, // GET
        getAllLogs: () => `${config.ApiBaseUrl}/logs`, // GET

        // News
        createNews: () => `${config.ApiBaseUrl}/news`, // POST
        getNewsById: (id: string) => `${config.ApiBaseUrl}/news?id=${id}`, // GET
        getAllNews: () => `${config.ApiBaseUrl}/news`, // GET
        updateNews: (id: string) => `${config.ApiBaseUrl}/news?id=${id}`, // PUT
        deleteNews: (id: string) => `${config.ApiBaseUrl}/news?id=${id}`, // DELETE

        // Routes
        createRoute: () => `${config.ApiBaseUrl}/routes`, // POST
        getRouteById: (id: string) => `${config.ApiBaseUrl}/routes?id=${id}`, // GET
        getAllRoutes: () => `${config.ApiBaseUrl}/routes`, // GET
        getRouteByScheduleId: (scheduleId: string) => `${config.ApiBaseUrl}/routes?id=${scheduleId}&action=by-schedule`, // GET
        updateRoute: (id: string) => `${config.ApiBaseUrl}/routes?id=${id}`, // PUT
        deleteRoute: (id: string) => `${config.ApiBaseUrl}/routes?id=${id}`, // DELETE

        // Schedules
        createSchedule: () => `${config.ApiBaseUrl}/schedules`, // POST
        getScheduleById: (id: string) => `${config.ApiBaseUrl}/schedules?id=${id}`, // GET
        getAllSchedules: () => `${config.ApiBaseUrl}/schedules`, // GET
        updateSchedule: (id: string) => `${config.ApiBaseUrl}/schedules?id=${id}`, // PUT
        deleteSchedule: (id: string) => `${config.ApiBaseUrl}/schedules?id=${id}`, // DELETE
    };
}

export default apiRoutes;
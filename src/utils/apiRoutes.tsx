


const apiRoutes = {
    getAccount: (id: string) => `/api/accounts/${id}`,
    getAccounts: '/api/accounts',
    getAnnouncements: '/api/announcements',
    getAnnouncement: (id: string) => `/api/announcements/${id}`,
}

export default apiRoutes;
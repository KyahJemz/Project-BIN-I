import { ErrorResponse } from "@/types/ErrorResponse.dto";

export const ErrorResponses = {
    ACCOUNT_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Account not found.",
    }),
    ANNOUNCEMENT_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Announcement not found.",
    }),
    CONTACT_DETAIL_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Contact detail not found.",
    }),
    EVENT_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Event not found.",
    }),
    LOG_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Log not found.",
    }),
    NEWS_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "News not found.",
    }),
    ROUTE_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Route not found.",
    }),
    SCHEDULE_NOT_FOUND: (): ErrorResponse => ({
        statusCode: 404,
        message: "Schedule not found.",
    }),
    INVALID_ID: (id: string): ErrorResponse => ({
        statusCode: 400,
        message: `Invalid ID: ${id}`,
    }),
    MISSING_PARAMETER: (param: string): ErrorResponse => ({
        statusCode: 400,
        message: `Missing parameter: ${param}`,
    }),
    UNAUTHORIZED: (): ErrorResponse => ({
        statusCode: 401,
        message: "Unauthorized access.",
    }),
    WRONG_PASSWORD: (): ErrorResponse => ({
        statusCode: 401,
        message: "Wrong password provided.",
    }),
    INVALID_ENDPOINT: (): ErrorResponse => ({
        statusCode: 404,
        message: "Invalid endpoint.",
    }),
    METHOD_NOT_ALLOWED: (method: string): ErrorResponse => ({
        statusCode: 405,
        message: `Method ${method} not allowed`,
    }),
    UNHANDLED_ERROR: (error: Error): ErrorResponse => ({
        statusCode: 500,
        message: `An unexpected error occurred: ${error.message}`,
    }),
};
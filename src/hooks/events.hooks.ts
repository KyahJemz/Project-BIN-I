'use client';

import apiRoutes from '@/utils/apiRoutes';
import { ICreateEventRequest, IUpdateEventRequest } from '@/validation/events.validation';
import { useState } from 'react';

export const useCreateEventHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const createEvent = async (request: ICreateEventRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.createEvent()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to create event',
				);
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { createEvent, isLoading, error, response };
}

export const useGetEventByIdHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getEventById = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getEventById(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get event',
				);
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { getEventById, isLoading, error, response };
}

export const useGetAllEventsHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getAllEvents = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getAllEvents()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get events',
				);
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { getAllEvents, isLoading, error, response };
}

export const useUpdateEventHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const updateEvent = async (id: string, request: IUpdateEventRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.updateEvent(id)}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to update event',
				);
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { updateEvent, isLoading, error, response };
}

export const useDeleteEventHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const deleteEvent = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.deleteEvent(id)}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to delete event',
				);
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { deleteEvent, isLoading, error, response };
}
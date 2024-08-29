'use client';

import apiRoutes from '@/utils/apiRoutes';
import { ICreateRoutesRequest, IUpdateRoutesRequest } from '@/validation/routes.validation';
import { useState } from 'react';

export const useCreateRouteHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const createRoute = async (request: ICreateRoutesRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.createRoute()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to create route',
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
	return { createRoute, isLoading, error, response };
}

export const useGetRouteByIdHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getRouteById = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getRouteById(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get route',
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
	return { getRouteById, isLoading, error, response };
}

export const useGetAllRoutesHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getAllRoutes = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getAllRoutes()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get routes',
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
	return { getAllRoutes, isLoading, error, response };
}

export const useGetRouteByScheduleIdHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getRouteByScheduleId = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getRouteByScheduleId(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get routes',
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
	return { getRouteByScheduleId, isLoading, error, response };
}

export const useUpdateRouteHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const updateRoute = async (id: string, request: IUpdateRoutesRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.updateRoute(id)}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to update route',
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
	return { updateRoute, isLoading, error, response };
}

export const useDeleteRouteHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const deleteRoute = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.deleteRoute(id)}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to delete route',
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
	return { deleteRoute, isLoading, error, response };
}
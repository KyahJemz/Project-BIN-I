'use client';

import apiRoutes from '@/utils/apiRoutes';
import { ICreateContactDetailsRequest, IUpdateContactDetailsRequest } from '@/validation/contactDetails.validation';
import { useState } from 'react';

export const useCreateContactDetailsHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const createContactDetails = async (request: ICreateContactDetailsRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.createContactDetails()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to create contact details',
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
	return { createContactDetails, isLoading, error, response };
}

export const useGetContactDetailsByIdHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getContactDetailsById = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getContactDetailsById(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get contact details',
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
	return { getContactDetailsById, isLoading, error, response };
}

export const useGetAllContactDetailsHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const getAllContactDetails = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getAllContactDetails()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to get contact details',
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
	return { getAllContactDetails, isLoading, error, response };
}

export const useUpdateContactDetailsHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const updateContactDetails = async (id: string, request: IUpdateContactDetailsRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.updateContactDetails(id)}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to update contact details',
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
	return { updateContactDetails, isLoading, error, response };
}

export const useDeleteContactDetailsHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const deleteContactDetails = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.deleteContactDetails(id)}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to delete contact details',
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
	return { deleteContactDetails, isLoading, error, response };
}
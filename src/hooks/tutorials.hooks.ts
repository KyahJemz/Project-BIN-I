'use client';

import apiRoutes from '@/utils/apiRoutes';
import { useState } from 'react';

export const useGetTutorialByIdHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const getTutorialById = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getTutorialById(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to get tutorial');
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { getTutorialById, isLoading, error, response };
};

export const useGetAllTutorialsHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const getAllTutorials = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getAllTutorials()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to get tutorial');
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { getAllTutorials, isLoading, error, response };
};

export const useGetTutorialCertificateHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const getTutorialCertificate = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getCertificate(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to get tutorial');
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { getTutorialCertificate, isLoading, error, response };
};
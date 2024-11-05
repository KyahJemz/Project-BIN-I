'use client';

import { useAuthorizationStore } from '@/stores/useAuthorizationStore';
import apiRoutes from '@/utils/apiRoutes';
import { IChangeUserPasswordRequest, ICreateUserRequest, ILoginRequest, IUpdateUserProgressRequest } from '@/validation/users.validation';
import { useState } from 'react';

export const useCreateUserHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const createUser = async (request: ICreateUserRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.registerUser()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to create user',
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
	return { createUser, isLoading, error, response };
};

export const useValidateUserHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);
	const { authorization ,setAuthorization } = useAuthorizationStore();

	const validateUser = async (request: ILoginRequest) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.validateUser()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to verify user',
				);
			}
			const data = await res.json();
			setAuthorization(data.token);
			console.log(authorization);
			localStorage.setItem("authorization", data.token);
			localStorage.setItem("user", data);
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { validateUser, isLoading, error, response };
};

export const useGetUserByIdHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const getUserById = async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.getUserById(id)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to get user');
			}
			const data = await res.json();
			setResponse(data);
		} catch (err: any) {
			setError(err.message || 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};
	return { getUserById, isLoading, error, response };
};

export const useUpdateUserProgressHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const updateUserProgress = async (
		id: string,
		request: IUpdateUserProgressRequest,
	) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.updateUserProgress(id)}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to update user',
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
	return { updateUserProgress, isLoading, error, response };
};

export const useChangeUserPasswordHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const changeUserPassword = async (
		id: string,
		request: IChangeUserPasswordRequest,
	) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.changeUserPassword(id)}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				},
				body: JSON.stringify(request),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to change password',
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
	return { changeUserPassword, isLoading, error, response };
};

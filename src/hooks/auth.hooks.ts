import { useState } from 'react';
import apiRoutes from '@/utils/apiRoutes';

export const useAuthenticateHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);

	const authenticate = async () => {
		const formData = new FormData();

		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.authenticate()}`, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				}
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to authenticate',
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

	return { authenticate, isLoading, error, response };
};

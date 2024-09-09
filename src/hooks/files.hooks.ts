import { useState } from 'react';
import apiRoutes from '@/utils/apiRoutes';


export const useUploadFileHook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [response, setResponse] = useState<null | any>(null);


	const uploadFile = async (file: File, id: string, category: string) => {
		const formData = new FormData();
		formData.append('file', file);
        formData.append('id', id);
		formData.append('category', category);

		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch(`${apiRoutes.uploadFile()}`, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("authorization")}`,
				}
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(
					errorData.message || 'Failed to upload file',
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

	return { uploadFile, isLoading, error, response };
};

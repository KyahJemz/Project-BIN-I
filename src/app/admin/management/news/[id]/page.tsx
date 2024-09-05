"use client";

import {
	useGetRouteByIdHook,
} from '@/hooks/routes.hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const IdViewNews = ({ params }: { params: { id: string } }) => {
	const router = useRouter();

	const [title, setTitle] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [content, setContent] = useState<string>('');

	const {
		getRouteById,
		isLoading: isGettingRouteById,
		error: isGetRouteByIdError,
		response: getRouteByIdResponse,
	} = useGetRouteByIdHook();

	useEffect(() => {
		const fetch = async () => {
			await getRouteById(params.id);
		};
		fetch();

	}, []);

	useEffect(() => {
		if (getRouteByIdResponse) {
			setScheduleId(getRouteByIdResponse?.schedule_id);
			setRouteName(getRouteByIdResponse?.routeName);
			setDescription(getRouteByIdResponse?.description);
			setStatus(getRouteByIdResponse?.status);
			setNotes(getRouteByIdResponse?.notes);
			setPickupPoints(getRouteByIdResponse?.pickupPoints);
		}
	}, [getRouteByIdResponse]);

	return (
		<>
			
		</>
	);
	
	

};

export default IdViewNews;

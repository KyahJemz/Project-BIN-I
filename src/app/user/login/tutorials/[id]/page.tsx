"use client"

import LessonList from "@/components/LessonList/LessonList";
import { useGetTutorialByIdHook } from "@/hooks/tutorials.hooks";
import { useGetUserByIdHook } from "@/hooks/users.hooks";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TutorialProgress {
	tutorial_id: string;
	count: number;
  }

export default function TutorialId({ params }: { params: { id: string } }) {
	const [data, setData ]= useState({
		title: '',
		tasks: [],
	});

	const [isCompleted, setIsCompleted] = useState(false);

    const {
        getTutorialById,
        isLoading: isGettingTutorialByIdNews,
        error: getTutorialByIdError,
        response: getTutorialByIdResponse,
    } = useGetTutorialByIdHook();

	const {
        getUserById,
        isLoading: isGettingUserByIdNews,
        error: getUserByIdError,
        response: getUserByIdResponse,
    } = useGetUserByIdHook();

	const { userData } = useUserStore((state) => ({
		userData: state.userData,
    }));

    useEffect(() => {
        const fetchData = async () => {
            await getTutorialById(params.id);
			await getUserById(userData._id);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

	useEffect(() => {
		if (!getTutorialByIdResponse || !getUserByIdResponse) return
		const userProgress = getUserByIdResponse?.progress ?? [];
		const progressedTutorials = getTutorialByIdResponse?.tasks ?? [];
		userProgress.forEach((tutorials: TutorialProgress) => {
			if (tutorials.tutorial_id === params.id) {
				for (let i = 0; i <= +tutorials.count; i++) {
					progressedTutorials[i].completed = true
				}
			}
		});
		const areAllCompleted = progressedTutorials.every(tutorial => tutorial.completed === true);
		if (areAllCompleted) setIsCompleted(true);
		setData({
            title: getTutorialByIdResponse.title,
            tasks: progressedTutorials,
        });
    }, [getTutorialByIdResponse, getUserByIdResponse]);

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Bin-I: {data?.title}</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Tutorials to help you get started</p>
				{isCompleted ? 
					<>
						<p className="text-md text-dark-gray mb-4">You have completed this tutorial, Thank you. <br/><Link className="italic text-xs underline" href={'/user/login/certificates/'+params.id}>View certificate</Link></p> 
						
					</>
				: null}
				<LessonList data={data?.tasks ?? []} link={'/user/login/tutorials/'+params.id}/>
		    </div>
		</main>
	)
}

"use client";

import TutorialList from '@/components/TutorialLists/TutorialList';
import { useGetAllTutorialsHook } from '@/hooks/tutorials.hooks';
import { useGetUserByIdHook } from '@/hooks/users.hooks';
import { useUserStore } from '@/stores/useUserStore';
import React, { useEffect, useState } from "react";

interface TutorialProgress {
	tutorial_id: string;
	count: number;
  }

export default function Tutorials() {
    const [data, setData ]= useState([]);

    const {
        getAllTutorials,
        isLoading: isGettingAllTutorialsNews,
        error: getAllTutorialsError,
        response: getAllTutorialsResponse,
    } = useGetAllTutorialsHook();

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
            await getAllTutorials();
            await getUserById(userData._id);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!getAllTutorialsResponse || !getUserByIdResponse) return
        let tutorialItems = getAllTutorialsResponse;
        getAllTutorialsResponse.forEach((tutorialItem, index) => {
            const userProgress = getUserByIdResponse?.progress ?? [];
            const progressedTutorials = tutorialItem?.tasks ?? [];
            userProgress.forEach((tutorials: TutorialProgress) => {
                if (tutorials.tutorial_id === tutorialItem._id) {
                    for (let i = 0; i <= +tutorials.count; i++) {
                        progressedTutorials[i].completed = true
                    }
                }
            });
            const areAllCompleted = progressedTutorials.every(tutorial => tutorial.completed === true);
            tutorialItems[index].completed = areAllCompleted;
        });
        setData(tutorialItems);
    }, [getAllTutorialsResponse, getUserByIdResponse]);

    return (
        <main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white  max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">Bin-I Tutorials</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Tutorials to help you get started</p>
				<TutorialList data={data ?? []} header='Tutorials' link={'/user/login/tutorials'}/>
		    </div>
		</main>
    );
}
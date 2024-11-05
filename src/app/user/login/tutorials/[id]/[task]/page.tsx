"use client"

import { useGetTutorialByIdHook } from "@/hooks/tutorials.hooks";
import { useGetUserByIdHook, useUpdateUserProgressHook } from "@/hooks/users.hooks";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

interface TutorialProgress {
	tutorial_id: string;
	count: number;
  }

export default function TutorialId({ params }: { params: { id: string, task: string } }) {
    const [data, setData ]= useState({
		title: '',
		description: '',
        videoLink: '',
	});

    const [progressData, setProgressData ]= useState({
		title: '',
		tasks: [],
	});

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

    const {
        updateUserProgress,
        isLoading: isUpdatingUserProgress,
        error: updateUserProgressError,
        response: updateUserProgressResponse,
    } = useUpdateUserProgressHook();

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
		const tutorialList = getTutorialByIdResponse?.tasks ?? [];

        let isAdded = false;
        let doIncrement = false;
        let markAsCompleted = false;
        let indexOfTask = 0;
        tutorialList.forEach((element, index) => {
            if (element._id === params.task) {
                indexOfTask = index;
                setData(element)
            }
        });
        userProgress.forEach((progress, index) => {
            if (progress.tutorial_id === params.id) {
                isAdded = true;
                if (!progress.dateCompleted && indexOfTask >= tutorialList.length - 1) {
                    markAsCompleted = true;
                }
                if (+indexOfTask > +progress.count) {
                    doIncrement = true;
                }
            }
        });
        if (!isAdded) {
            updateUserProgress(
                userData._id,
                {progress: [{
                    tutorial_id: params.id, count: indexOfTask, dateCompleted: null, certificateLink: null
                }]}
            )
        } else {
            if (markAsCompleted) {
                updateUserProgress(
                    userData._id,
                    {progress: [{
                        tutorial_id: params.id, count: indexOfTask, dateCompleted: new Date(), certificateLink: null
                    }]}
                )
            }
            if (doIncrement) {
                updateUserProgress(
                    userData._id,
                    {progress: [{
                        tutorial_id: params.id, count: indexOfTask, dateCompleted: null, certificateLink: null
                    }]}
                )
            }
        }
        setProgressData({
            title: getTutorialByIdResponse.title,
            tasks: tutorialList,
        });
    }, [getTutorialByIdResponse, getUserByIdResponse]);

	return (
        <main className="container mx-auto my-6 p-4 rounded-lg shadow-md bg-white max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <p className="text-lg mb-4">{data.description}</p>
            {data.videoLink && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Watch the Tutorial:</h2>
                    <iframe
                        src={data.videoLink}
                        title={data.title}
                        className="w-full h-64"
                        allowFullScreen
                    />
                </div>
            )}
        </main>
    );
}

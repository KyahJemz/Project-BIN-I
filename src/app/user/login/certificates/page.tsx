"use client"

import { useGetTutorialByIdHook } from "@/hooks/tutorials.hooks";
import { useGetUserByIdHook } from "@/hooks/users.hooks";
import { useUserStore } from "@/stores/useUserStore";
import { formatFullDate } from "@/utils/utilities";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Certificates() {

	const [certificateIds, setCertificateIds] = useState<string[]>([]);
	const [certificateDateCompleted, setCertificateDateCompleted] = useState<string[]>([]);
	const [completedTutorials, setCompletedTutorials] = useState<any[]>([]);

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
			await getUserById(userData._id);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

	useEffect(() => {
		const ids: string[] = [];
		const dateCompleted: string[] = [];
		if (getUserByIdResponse) {
			getUserByIdResponse.progress.map((item: any) => {
				if (item.dateCompleted) {
					ids.push(item.tutorial_id)
					dateCompleted.push(item.dateCompleted)
				}
			})
		}
		setCertificateIds(ids)
		setCertificateDateCompleted(dateCompleted)
    }, [getUserByIdResponse]);

	useEffect(() => {
		async function fetchData() {
			const itemsToWait = certificateIds.map((id) => getTutorialById(id));
			await Promise.all(itemsToWait);
		}
		fetchData();
	}, [certificateIds]);

	useEffect(() => {
		if (getTutorialByIdResponse) {
			setCompletedTutorials((prev) => [...prev, {...getTutorialByIdResponse}]);
		}
		console.log(completedTutorials);
	}, [getTutorialByIdResponse]);

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-6 bg-white max-w-7xl'>
				<h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">My Certificates</h2>
				<p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Your certificates for completed tutorials.</p>
				{completedTutorials.length > 0 ? (
					<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{completedTutorials.map((tutorial, index) => (
							<Link
								key={tutorial._id ?? index}
								href={`/user/login/certificates/${tutorial._id}`}
								className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
							>
								<h2 className="text-xl font-bold text-gray-800 mb-2">{tutorial.title}</h2>
								<div className="text-sm text-gray-500 mb-4">
									{tutorial.tasks && tutorial.tasks.map((task: any) => (
										<p className="text-gray-600" key={task._id}>{task.title}</p>
									))}
									<p className="text-gray-600"></p>
								</div>
								<div className="text-sm text-gray-500">
									{certificateDateCompleted[index]  && (
										<p>Completed on: {formatFullDate(certificateDateCompleted[index])}</p>
									)}
								</div>
							</Link>
						))}
					</div>
				) : (
					<p className="text-gray-600">No certificates yet.</p>
				)}
			</div>
		</main>
	)
}

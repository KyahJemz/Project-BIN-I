'use client'

import Certificate from "@/components/Certificate/Certificate";
import { useGetTutorialByIdHook } from "@/hooks/tutorials.hooks";
import { useGetUserByIdHook } from "@/hooks/users.hooks";
import { useUserStore } from "@/stores/useUserStore";
import { formatCertificateDate } from "@/utils/utilities";
import { useEffect, useState } from "react";

export default function CertificateId({ params }: { params: { task: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [certData, setCertData] = useState({
        date: '...',
        name: '...',
        title: '...',
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

	const { userData } = useUserStore((state) => ({
		userData: state.userData,
    }));

	useEffect(() => {
        const fetchData = async () => {
            await getTutorialById(params.task);
			await getUserById(userData._id);
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (getUserByIdResponse && getTutorialByIdResponse) {
            getUserByIdResponse.progress.forEach((progress: { tutorial_id: string; dateCompleted: string }) => {
                if ((progress.tutorial_id === params.task) && progress.dateCompleted) {
                    setCertData({
                        date: formatCertificateDate(progress.dateCompleted),
                        name: getUserByIdResponse.firstName + ' ' + getUserByIdResponse.middleName + ' ' + getUserByIdResponse.lastName,
                        title: getTutorialByIdResponse.title,
                    })
                    setIsValid(true);
                }
            });
            setIsLoading(false);
        }
    }, [getUserByIdResponse, getTutorialByIdResponse]);

    const CertificateLayout = () => {
        return (
            <Certificate date={certData.date} name={certData.name} title={certData.title} />
        )
    };

    const Invalid = () => ( 
        <>Invalid</>
    );

	return (
		<main>
            {isLoading ? <p>Loading...</p> : isValid ? <CertificateLayout /> : <Invalid />}
		</main>
	)
}

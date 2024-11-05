"use client";

import { useChangeUserPasswordHook, useGetUserByIdHook } from '@/hooks/users.hooks';
import { useUserStore } from '@/stores/useUserStore';
import React, { useEffect, useState } from 'react';

export default function MyProfile() {
    const [currentUserData, setCurrentUserData] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        progress: []
    });

    const {
        getUserById,
        isLoading: isGettingUserByIdNews,
        error: getUserByIdError,
        response: getUserByIdResponse,
    } = useGetUserByIdHook();

	const {
		changeUserPassword,
        isLoading: isChangingUserPasswordNews,
        error: changeUserPasswordError,
        response: changeUserPasswordResponse,
    } = useChangeUserPasswordHook();
	

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
        if (getUserByIdResponse) {
            setCurrentUserData(getUserByIdResponse);
        }
    }, [getUserByIdResponse]);

	useEffect(() => {
        if (isChangingUserPasswordNews || isGettingUserByIdNews) {
           document.getElementById('changePasswordBtn')?.setAttribute('disabled', 'true');
        } else {
		   document.getElementById('changePasswordBtn')?.removeAttribute('disabled');
		}
    }, [isChangingUserPasswordNews, isGettingUserByIdNews]);

	useEffect(() => {
        if (changeUserPasswordError) {
			alert(changeUserPasswordError);
        }
    }, [changeUserPasswordError]);

	useEffect(() => {
        if (changeUserPasswordResponse) {
			alert('Password changed successfully');
			window.location.reload();
        }
    }, [changeUserPasswordResponse]);

	async function handlePasswordChange(e: any) {
		const parent = e.target.parentNode;

		if (!parent) {
			return null;
		}

		const oldPassword = parent.querySelector('#oldPassword')?.value;
		const newPassword = parent.querySelector('#newPassword')?.value;
		const confirmPassword = parent.querySelector('#confirmPassword')?.value;

		if (!oldPassword || !newPassword || !confirmPassword) {
			alert('Please fill in all fields');
			return null;
		}

		if (newPassword !== confirmPassword) {
			alert('Passwords do not match');
			return null;
		}

		if (oldPassword === newPassword) {
			alert('New password cannot be the same as old password');
			return null;
		}	

		await changeUserPassword(userData._id, { oldPassword, newPassword });
	}

    return (
        <main>
            <div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
                <h2 className="text-3xl font-bold mb-2 text-dark-gray border-l-4 pl-2 border-forest-green">My Profile</h2>
                <p className="text-lg mb-4 text-dark-gray border-b-2 pb-4">Manage your account settings and update your profile information.</p>
                <div className="space-y-6">
                    {/* Account Information Section */}
                    <section className="p-4 border border-gray-300 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-forest-green mb-2">Account Information</h2>
                        <p><strong>Name:</strong> {`${currentUserData.firstName} ${currentUserData.middleName} ${currentUserData.lastName}`}</p>
                        <p><strong>Email:</strong> {currentUserData.email}</p>
                        <p><strong>Account Created:</strong> {new Date(currentUserData.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total Certificates:</strong> {currentUserData.progress.length}</p>
                    </section>

                    <section className="p-4 border border-gray-300 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-forest-green mb-2">Password Change</h2>
						<input type="password" id='oldPassword' minLength={8} required placeholder="Enter Old password" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        <input type="password" id='newPassword' minLength={8} required placeholder="Enter new password" className="w-full p-2 border border-gray-300 rounded-md mt-2 text-sm" />
                        <input type="password" id='confirmPassword' minLength={8} required placeholder="Confirm new password" className="w-full p-2 border border-gray-300 rounded-md mt-2 text-sm" />
                        <button type="button" id='changePasswordBtn' onClick={handlePasswordChange} className="mt-2 w-full bg-forest-green text-white py-2 rounded-md transition">Change Password</button>
                    </section>
                </div>
            </div>
        </main>
    );
}

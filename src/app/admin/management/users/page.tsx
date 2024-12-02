"use client";

import BiniTable from '@/components/BiniTable/BiniTable';
import React, { useEffect, useState } from 'react';
import {
    useGetAllUsersHook,
	useDeleteUserHook
} from '@/hooks/users.hooks';
import { useRouter } from 'next/navigation';
import { IUserDocument } from '@/models/users';
import { formatFullDate } from '@/utils/utilities';

const UsersManagement = () => {
	const router = useRouter();
	
	const [refresh, setRefresh] = useState(false);

	const {
		getAllUsers,
		isLoading: isGettingAllUser,
		error: getAllUsersError,
		response: getAllUsersResponse,
	} = useGetAllUsersHook();

	const {
		deleteUser,
		isLoading: isDeletingUser,
		error: deleteUserError,
		response: deleteUserResponse,
	} = useDeleteUserHook();

	useEffect(() => {
        const fetchData = async () => {
            await getAllUsers();
			setRefresh(false);
        };
        fetchData();
		// eslint-disable-next-line
    }, [refresh]);

	useEffect(() => {
        setRefresh(true);
    }, [deleteUserResponse]);

	const link = '/admin/management/users'
	const columns = [
		'#',
		'FirstName',
		'MiddleName',
		'LastName',
		'Email',
		'Progress',
		'Completed',
		'Timestamp'
	]
    const rows = getAllUsersResponse ? (getAllUsersResponse??[]).slice().reverse().map((user: IUserDocument, index: number) => {
        return {
            _id: user._id,
			'#': index + 1,
            FirstName: user.firstName,
			MiddleName: user.middleName,
            LastName: user.lastName,
            Email: user.email,
            Progress: user?.progress?.length ?? 0, 
  			Completed: user?.progress?.filter((item) => item.dateCompleted !== null)?.length ?? 0, 
			Timestamp: formatFullDate(user?.createdAt)??"",
        }
        }) : [];
    
	function onAdd () {
		router.push('/admin/management/users/add');
	}
	
    function onEdit (id: string) {
		router.push('/admin/management/users/edit/' + id);
	}
    function onDelete (id: string) {
		if (!isDeletingUser) {
			deleteUser(id);
		}
	}

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
				{isGettingAllUser 
					? <p>Loading...</p> 
					: <BiniTable header='Users Overview' columns={columns} data={rows} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} link={''} />
				}
			</div>
		</main>
	)
}	

export default UsersManagement;
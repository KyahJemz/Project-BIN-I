"use client";

import BiniTable from '@/components/BiniTable/BiniTable';
import React, { useEffect, useState } from 'react';
import {
    useGetAllAccountsHook,
	useDeleteAccountHook
} from '@/hooks/accounts.hooks';
import { useRouter } from 'next/navigation';
import { IAccountDocument } from '@/models/accounts';
import { formatFullDate } from '@/utils/utilities';

const AccountsManagement = () => {
	const router = useRouter();
	
	const [refresh, setRefresh] = useState(false);

	const {
		getAllAccounts,
		isLoading: isGettingAllAccount,
		error: getAllAccountsError,
		response: getAllAccountsResponse,
	} = useGetAllAccountsHook();

	const {
		deleteAccount,
		isLoading: isDeletingAccount,
		error: deleteAccountError,
		response: deleteAccountResponse,
	} = useDeleteAccountHook();

	useEffect(() => {
        const fetchData = async () => {
            await getAllAccounts();
			setRefresh(false);
        };
        fetchData();
    }, [refresh]);

	useEffect(() => {
        setRefresh(true);
    }, [deleteAccountResponse]);

	const link = '/admin/management/accounts'
	const columns = [
		'#',
		'FirstName',
		'LastName',
		'Email',
		'Department',
		'Position',
		'Timestamp'
	]
    const rows = getAllAccountsResponse ? (getAllAccountsResponse??[]).slice().reverse().map((account: IAccountDocument, index: number) => {
        return {
            _id: account._id,
			'#': index + 1,
            FirstName: account.firstName,
            LastName: account.lastName,
            Email: account.email,
            Department: account?.department??"N/A",
			Position: account?.position??"N/A",
			Timestamp: formatFullDate(account?.createdAt)??"",
        }
        }) : [];
    
	function onAdd () {
		router.push('/admin/management/accounts/add');
	}
	
    function onEdit (id: string) {
		router.push('/admin/management/accounts/edit/' + id);
	}
    function onDelete (id: string) {
		if (!isDeletingAccount) {
			deleteAccount(id);
		}
	}

	return (
		<main>
			<div className='container mx-auto justify-between py-6 my-6 rounded-lg shadow-md px-4 bg-white max-w-7xl'>
				{isGettingAllAccount 
					? <p>Loading...</p> 
					: <BiniTable header='Accounts Overview' columns={columns} data={rows} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
				}
			</div>
		</main>
	)
}	

export default AccountsManagement;
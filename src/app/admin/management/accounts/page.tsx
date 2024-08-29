'use client';

import {
	useCreateAccountHook,
	useValidateAccountHook,
	useGetAccountByIdHook,
	useGetAllAccountsHook,
	useUpdateAccountHook,
	useChangeAccountPasswordHook,
	useDeleteAccountHook,
} from '@/hooks/accounts.hooks';
import React, { useState } from 'react';

const AccountsManagement = () => {
	// Hook instances
	const {
		createAccount,
		isLoading: isCreating,
		error: createError,
		response: createResponse,
	} = useCreateAccountHook();
	const {
		validateAccount,
		isLoading: isValidating,
		error: validateError,
		response: validateResponse,
	} = useValidateAccountHook();
	const {
		getAccountById,
		isLoading: isGettingById,
		error: getByIdError,
		response: getByIdResponse,
	} = useGetAccountByIdHook();
	const {
		getAllAccounts,
		isLoading: isGettingAll,
		error: getAllError,
		response: getAllResponse,
	} = useGetAllAccountsHook();
	const {
		updateAccount,
		isLoading: isUpdating,
		error: updateError,
		response: updateResponse,
	} = useUpdateAccountHook();
	const {
		changeAccountPassword,
		isLoading: isChangingPassword,
		error: changePasswordError,
		response: changePasswordResponse,
	} = useChangeAccountPasswordHook();
	const {
		deleteAccount,
		isLoading: isDeleting,
		error: deleteError,
		response: deleteResponse,
	} = useDeleteAccountHook();

	// States for account management
	const [accountData, setAccountData] = useState({
		firstName: '',
		lastName: '',
		position: '',
		department: '',
		email: '',
		type: '',
		password: '',
	});
	const [accountId, setAccountId] = useState('');
	const [updateData, setUpdateData] = useState({ ...accountData });
	const [passwordData, setPasswordData] = useState({
		oldPassword: '',
		newPassword: '',
	});

	return (
		<div>
			<br />
			<br />
			<h2>Create Account</h2>
			<input
				type="text"
				placeholder="First Name"
				value={accountData.firstName}
				onChange={(e) =>
					setAccountData({
						...accountData,
						firstName: e.target.value,
					})
				}
			/>
			<input
				type="text"
				placeholder="Last Name"
				value={accountData.lastName}
				onChange={(e) =>
					setAccountData({ ...accountData, lastName: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Position"
				value={accountData.position}
				onChange={(e) =>
					setAccountData({ ...accountData, position: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Department"
				value={accountData.department}
				onChange={(e) =>
					setAccountData({
						...accountData,
						department: e.target.value,
					})
				}
			/>
			<input
				type="email"
				placeholder="Email"
				value={accountData.email}
				onChange={(e) =>
					setAccountData({ ...accountData, email: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Type"
				value={accountData.type}
				onChange={(e) =>
					setAccountData({ ...accountData, type: e.target.value })
				}
			/>
			<input
				type="password"
				placeholder="Password"
				value={accountData.password}
				onChange={(e) =>
					setAccountData({ ...accountData, password: e.target.value })
				}
			/>
			<button
				onClick={() => createAccount(accountData)}
				disabled={isCreating}
			>
				{isCreating ? 'Creating...' : 'Create Account'}
			</button>
			{createError && <p>Error: {createError}</p>}
			{createResponse && <p>Account created successfully!</p>}

			<br />
			<br />
			<h2>Validate Account</h2>
			<input
				type="email"
				placeholder="Email"
				value={accountData.email}
				onChange={(e) =>
					setAccountData({ ...accountData, email: e.target.value })
				}
			/>
			<input
				type="password"
				placeholder="Password"
				value={accountData.password}
				onChange={(e) =>
					setAccountData({ ...accountData, password: e.target.value })
				}
			/>
			<button
				onClick={() => validateAccount(accountData)}
				disabled={isValidating}
			>
				{isValidating ? 'Validating...' : 'Validate Account'}
			</button>
			{validateError && <p>Error: {validateError}</p>}
			{validateResponse && <p>Account validated successfully!</p>}

			<br />
			<br />
			<h2>Get Account By ID</h2>
			<input
				type="text"
				placeholder="Account ID"
				value={accountId}
				onChange={(e) => setAccountId(e.target.value)}
			/>
			<button
				onClick={() => getAccountById(accountId)}
				disabled={isGettingById}
			>
				{isGettingById ? 'Getting Account...' : 'Get Account'}
			</button>
			{getByIdError && <p>Error: {getByIdError}</p>}
			{getByIdResponse && (
				<p>Account Data: {JSON.stringify(getByIdResponse)}</p>
			)}

			<br />
			<br />
			<h2>Get All Accounts</h2>
			<button onClick={getAllAccounts} disabled={isGettingAll}>
				{isGettingAll ? 'Getting Accounts...' : 'Get All Accounts'}
			</button>
			{getAllError && <p>Error: {getAllError}</p>}
			{getAllResponse && (
				<p>All Accounts: {JSON.stringify(getAllResponse)}</p>
			)}

			<br />
			<br />
			<h2>Update Account</h2>
			<input
				type="text"
				placeholder="Account ID"
				value={accountId}
				onChange={(e) => setAccountId(e.target.value)}
			/>
			<input
				type="text"
				placeholder="First Name"
				value={updateData.firstName}
				onChange={(e) =>
					setUpdateData({ ...updateData, firstName: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Last Name"
				value={updateData.lastName}
				onChange={(e) =>
					setUpdateData({ ...updateData, lastName: e.target.value })
				}
			/>
			<button
				onClick={() => updateAccount(accountId, updateData)}
				disabled={isUpdating}
			>
				{isUpdating ? 'Updating...' : 'Update Account'}
			</button>
			{updateError && <p>Error: {updateError}</p>}
			{updateResponse && <p>Account updated successfully!</p>}

			<br />
			<br />
			<h2>Change Account Password</h2>
			<input
				type="text"
				placeholder="Account ID"
				value={accountId}
				onChange={(e) => setAccountId(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Old Password"
				value={passwordData.oldPassword}
				onChange={(e) =>
					setPasswordData({
						...passwordData,
						oldPassword: e.target.value,
					})
				}
			/>
			<input
				type="password"
				placeholder="New Password"
				value={passwordData.newPassword}
				onChange={(e) =>
					setPasswordData({
						...passwordData,
						newPassword: e.target.value,
					})
				}
			/>
			<button
				onClick={() => changeAccountPassword(accountId, passwordData)}
				disabled={isChangingPassword}
			>
				{isChangingPassword
					? 'Changing Password...'
					: 'Change Password'}
			</button>
			{changePasswordError && <p>Error: {changePasswordError}</p>}
			{changePasswordResponse && <p>Password changed successfully!</p>}

			<br />
			<br />
			<h2>Delete Account</h2>
			<input
				type="text"
				placeholder="Account ID"
				value={accountId}
				onChange={(e) => setAccountId(e.target.value)}
			/>
			<button
				onClick={() => deleteAccount(accountId)}
				disabled={isDeleting}
			>
				{isDeleting ? 'Deleting...' : 'Delete Account'}
			</button>
			{deleteError && <p>Error: {deleteError}</p>}
			{deleteResponse && <p>Account deleted successfully!</p>}
		</div>
	);
};

export default AccountsManagement;

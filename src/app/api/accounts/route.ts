import AccountModel from '@/models/accounts';
import { AccountService } from '@/services/accounts.service';
import { LogsService } from '@/services/logs.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { signJwt, validateRequest } from '@/utils/jwt';
import { MongoDbConnect } from '@/utils/mongodb';
import {
	ChangeAccountPasswordRequestSchema,
	CreateAccountRequestSchema,
	LoginRequestSchema,
	UpdateAccountRequestSchema,
} from '@/validation/accounts.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new account
export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const action = url.searchParams.get('action');
	const accountService = new AccountService(AccountModel, req.headers);
	try {
		if (action && action.includes('verify')) {
			const parsedRequest = LoginRequestSchema.parse(await req.json());
			const account = await accountService.validateAccount(parsedRequest);
			const token = signJwt({...account, password: null, token: null});
			await accountService.updateAccount(account._id as string, { token: token });
			return NextResponse.json({...account, token}, { status: 200 });
		} else {
			const parsedRequest = CreateAccountRequestSchema.parse(
				await req.json(),
			);
			await validateRequest(req);
			const account = await accountService.createAccount(parsedRequest);
			return NextResponse.json(account, { status: 201 });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch account details or all accounts
export async function GET(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const accountService = new AccountService(AccountModel, req.headers);
		if (id) {
			const account = await accountService.getAccountById(id);
			return NextResponse.json(account);
		} else {
			const accounts = await accountService.getAllAccounts();
			return NextResponse.json(accounts);
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PUT method: Update an account
export async function PUT(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const parsedRequest = UpdateAccountRequestSchema.parse(
			await req.json(),
		);
		const accountService = new AccountService(AccountModel, req.headers);
		if (id) {
			const updatedAccount = await accountService.updateAccount(
				id,
				parsedRequest,
			);
			return NextResponse.json(updatedAccount);
		} else {
			const { statusCode, message } =
				ErrorResponses.MISSING_PARAMETER('id');
			return NextResponse.json({ message }, { status: statusCode });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// PATCH method: Change account password
export async function PATCH(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	const action = url.searchParams.get('action');

	if (action && action.includes('change-password')) {
		try {
			const accountService = new AccountService(AccountModel, req.headers);
			const parsedRequest = ChangeAccountPasswordRequestSchema.parse(
				await req.json(),
			);
			if (id && parsedRequest.newPassword && parsedRequest.oldPassword) {
				const result = await accountService.changeAccountPassword(
					id,
					parsedRequest.newPassword,
				);
				return NextResponse.json(result);
			} else {
				const { statusCode, message } =
					ErrorResponses.MISSING_PARAMETER('id or newPassword');
				return NextResponse.json({ message }, { status: statusCode });
			}
		} catch (error: any) {
			const { statusCode, message } =
				ErrorResponses.UNHANDLED_ERROR(error);
			return NextResponse.json({ message }, { status: statusCode });
		}
	} else {
		const { statusCode, message } =
			ErrorResponses.MISSING_PARAMETER('endpoint mismatch');
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// DELETE method: Delete an account
export async function DELETE(req: NextRequest) {
	await validateRequest(req);
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const accountService = new AccountService(AccountModel, req.headers);
		if (id) {
			await accountService.deleteAccount(id);
			return NextResponse.json({
				message: `Account with ID: ${id} deleted successfully`,
			});
		} else {
			const { statusCode, message } =
				ErrorResponses.MISSING_PARAMETER('id');
			return NextResponse.json({ message }, { status: statusCode });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

import UserModel from '@/models/users';
import { UsersService } from '@/services/users.service';
import { ErrorResponses } from '@/utils/errorResponses';
import { signJwt, validateRequest } from '@/utils/jwt';
import { ChangeUserPasswordRequestSchema, CreateUserRequestSchema, LoginRequestSchema, UpdateUserProgressRequest } from '@/validation/users.validation';
import { NextResponse, NextRequest } from 'next/server';

// POST method: Create a new user
export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const action = url.searchParams.get('action');
	const userService = new UsersService(UserModel, req.headers);
	try {
		if (action && action.includes('verify')) {
			console.log("verify")
			const parsedRequest = LoginRequestSchema.parse(await req.json());
			const user = await userService.validateUser(parsedRequest);
			const token = signJwt({...user, password: null, token: null});
			await userService.updateUser(user._id as string, { token: token });
			return NextResponse.json({...user, token}, { status: 200 });
		} else if (action && action.includes('register')) {
			console.log("register")
			const parsedRequest = CreateUserRequestSchema.parse(
				await req.json(),
			);
			const user = await userService.createUser(parsedRequest);
			return NextResponse.json(user, { status: 201 });
		}
	} catch (error: any) {
		const { statusCode, message } = ErrorResponses.UNHANDLED_ERROR(error);
		return NextResponse.json({ message }, { status: statusCode });
	}
}

// GET method: Fetch user details
export async function GET(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const userService = new UsersService(UserModel, req.headers);
		if (id) {
			const user = await userService.getUserById(id);
			return NextResponse.json(user);
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

// PUT method: Update an Progress
export async function PUT(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	try {
		const parsedRequest = UpdateUserProgressRequest.parse(
			await req.json(),
		);
		const userService = new UsersService(UserModel, req.headers);
		if (id) {
			const updatedUser = await userService.updateUserProgress(
				id,
				parsedRequest,
			);
			return NextResponse.json(updatedUser);
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

// PATCH method: Change user password
export async function PATCH(req: NextRequest) {
	await validateRequest(req, 'users');
	const url = new URL(req.url);
	const id = url.searchParams.get('id');
	const action = url.searchParams.get('action');

	if (action && action.includes('change-password')) {
		try {
			const userService = new UsersService(UserModel, req.headers);
			const parsedRequest = ChangeUserPasswordRequestSchema.parse(
				await req.json(),
			);
			if (id && parsedRequest.newPassword && parsedRequest.oldPassword) {
				const result = await userService.changeUserPassword(
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